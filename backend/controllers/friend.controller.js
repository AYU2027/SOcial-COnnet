import User from "../models/user.model.js";
import mongoose from "mongoose";

export const addFriend = async (req, res) => {
    try {
        const { id: friendId } = req.params; // The ID of the user to add
        const { _id: userId } = req.user; // The ID of the currently logged-in user

        // Validate the friendId
        if (!mongoose.Types.ObjectId.isValid(friendId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        // Find both users
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!friend) {
            return res.status(404).json({ error: "User to add not found" });
        }

        // Check if they are already friends
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ error: "You are already friends with this user" });
        }
        
        // Prevent adding oneself as a friend
        if (userId.equals(friendId)) {
            return res.status(400).json({ error: "You cannot add yourself as a friend" });
        }

        // Add friend to user's friends list
        user.friends.push(friendId);
        // Optional: Make it a two-way friendship by adding the user to the friend's list as well
        friend.friends.push(userId);

        await user.save();
        await friend.save();

        res.status(200).json({ message: "Friend added successfully" });

    } catch (error) {
        console.log("Error in addFriend controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};