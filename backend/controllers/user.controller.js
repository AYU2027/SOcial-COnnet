import User from "../models/user.model.js";

// This function gets ALL users for the search functionality
export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.error("Error in getUsers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// --- NEW FUNCTION ---
// This function gets ONLY the user's friends for the sidebar
export const getFriends = async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the user and populate the 'friends' field
        // This replaces the friend IDs with the full user documents
        const user = await User.findById(userId).populate({
            path: 'friends',
            select: '-password' // Exclude passwords of friends
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getFriends controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};