import User from "../models/user.model.js";
import mongoose from "mongoose";

// --- 1. SEND A FRIEND REQUEST ---
export const sendFriendRequest = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { _id: senderId } = req.user;

        // Prevent sending a request to oneself
        if (senderId.equals(receiverId)) {
            return res.status(400).json({ error: "You cannot send a friend request to yourself." });
        }

        const receiver = await User.findById(receiverId);
        const sender = await User.findById(senderId);

        if (!receiver) {
            return res.status(404).json({ error: "Receiving user not found." });
        }

        // Check if they are already friends
        if (sender.friends.includes(receiverId)) {
            return res.status(400).json({ error: "You are already friends." });
        }

        // Check if a request has already been sent
        if (sender.friendRequestsSent.includes(receiverId)) {
            return res.status(400).json({ error: "Friend request already sent." });
        }

        // Add request to sender's sent list and receiver's received list
        sender.friendRequestsSent.push(receiverId);
        receiver.friendRequestsReceived.push(senderId);

        await sender.save();
        await receiver.save();

        res.status(200).json({ message: "Friend request sent successfully." });
    } catch (error) {
        console.log("Error in sendFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --- 2. ACCEPT A FRIEND REQUEST ---
export const acceptFriendRequest = async (req, res) => {
    try {
        const { id: senderId } = req.params; // The ID of the person who sent the request
        const { _id: receiverId } = req.user; // The ID of the person accepting the request (me)

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        // Check if the request exists
        if (!receiver.friendRequestsReceived.includes(senderId)) {
            return res.status(404).json({ error: "Friend request not found." });
        }

        // Add to friends lists for both users
        receiver.friends.push(senderId);
        sender.friends.push(receiverId);

        // Remove the request from both users' request lists
        receiver.friendRequestsReceived.pull(senderId);
        sender.friendRequestsSent.pull(receiverId);

        await receiver.save();
        await sender.save();

        res.status(200).json({ message: "Friend request accepted." });
    } catch (error) {
        console.log("Error in acceptFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --- 3. DECLINE A FRIEND REQUEST ---
export const declineFriendRequest = async (req, res) => {
    try {
        const { id: senderId } = req.params;
        const { _id: receiverId } = req.user;

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);
        
        // Remove the request from both users' request lists
        receiver.friendRequestsReceived.pull(senderId);
        sender.friendRequestsSent.pull(receiverId);

        await receiver.save();
        await sender.save();

        res.status(200).json({ message: "Friend request declined." });
    } catch (error) {
        console.log("Error in declineFriendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --- 4. REMOVE AN EXISTING FRIEND ---
export const removeFriend = async (req, res) => {
    try {
        const { id: friendId } = req.params;
        const { _id: userId } = req.user;

        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
        
        // Remove from each other's friends lists
        user.friends.pull(friendId);
        friend.friends.pull(userId);

        await user.save();
        await friend.save();

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        console.log("Error in removeFriend controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// --- 5. GET FRIEND REQUESTS ---
export const getFriendRequests = async (req, res) => {
     try {
        const { _id: userId } = req.user;
        const user = await User.findById(userId).populate({
            path: 'friendRequestsReceived',
            select: 'fullName profilePic username'
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user.friendRequestsReceived);
     } catch (error) {
        console.log("Error in getFriendRequests controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
     }
}