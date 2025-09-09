import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d", // Token will expire in 15 days
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true, // Prevents XSS attacks (cross-site scripting)
        sameSite: "strict", // Prevents CSRF attacks (cross-site request forgery)
    });
};

export default generateTokenAndSetCookie;