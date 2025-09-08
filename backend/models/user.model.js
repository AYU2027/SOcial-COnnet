import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"], // The gender must be one of these two values
    },
    profilePic: {
        type: String,
        default: "",
    },
}, { timestamps: true }); // timestamps adds createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);

export default User;