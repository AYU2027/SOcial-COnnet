import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body; // The message content from the request body
        const { id: receiverId } = req.params; // The recipient's ID from the URL parameters
        const senderId = req.user._id; // The sender's ID (from the protectRoute middleware)

        // Find an existing conversation between these two users
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create the new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Add the new message's ID to the conversation's messages array
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // This will run both save operations in parallel, which is more efficient
        await Promise.all([conversation.save(), newMessage.save()]);

        // SOCKET IO LOGIC WILL GO HERE LATER

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find the conversation containing both the sender and the receiver
        // .populate() will replace message IDs with actual message documents
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            // If no conversation exists, there are no messages to return
            return res.status(200).json([]);
        }

        const messages = conversation.messages;

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};