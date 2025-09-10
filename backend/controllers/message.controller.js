import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket.js";
import mongoose from "mongoose";

// --- sendMessage and getMessages functions (from previous steps) remain the same ---
// ... (code for sendMessage) ...
// ... (code for getMessages) ...
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
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

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


// --- NEW DELETE MESSAGE FUNCTION ---
export const deleteMessage = async (req, res) => {
    try {
        const { id: messageId } = req.params; // The ID of the message to delete
        const userId = req.user._id; // The ID of the currently logged-in user

        // Validate the messageId
        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({ error: "Invalid message ID format" });
        }

        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: "Message not found" });
        }

        // --- AUTHORIZATION CHECK ---
        // Ensure that the user trying to delete the message is the one who sent it
        if (message.senderId.toString() !== userId.toString()) {
            return res.status(401).json({ error: "Unauthorized: You can only delete your own messages." });
        }

        // For "delete for me", we can just delete the message document.
        // For a "delete for everyone", you might update the text to "[This message was deleted]"
        await Message.findByIdAndDelete(messageId);
        
        // Also remove the message ID from the conversation's messages array
        await Conversation.updateMany(
            { messages: messageId },
            { $pull: { messages: messageId } }
        );

        res.status(200).json({ message: "Message deleted successfully" });

    } catch (error) {
        console.log("Error in deleteMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};