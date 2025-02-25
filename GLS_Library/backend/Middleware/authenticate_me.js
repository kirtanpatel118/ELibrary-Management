const jwt = require('jsonwebtoken');
// const User = require('../Models/userModel');
const User=require('../Model/Faculty');



const authenticate_me = async (req, res) => {
    const token = req.header('Authorization');
    console.log("Received token:", token);
    
    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    // Remove "Bearer " prefix from token
    const jwtToken = token.replace("Bearer ", "").trim();
    console.log("JWT Token from sender:", jwtToken);

    try {
        const isVerified = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        console.log("Token verified, data:", isVerified);

        const u_id = isVerified._id;
        let user;

        switch (isVerified.role) {
            case 'student':
                user = await Student.findById(u_id);
                break;
            case 'faculty':
                user = await Faculty.findById(u_id);
                break;
            case 'admin':
                user = await Admin.findById(u_id);
                break;
            default:
                return res.status(403).json({ message: "Unauthorized role" });
        }

        if (!user) {
            console.log("User  not found");
            return res.status(404).json({ error: 'User  not found' });
        }

        console.log("User  details:", user);
        // return res.json({ message: 'Token is valid', ok: true, user });

       
        req.user =user;
        req.token = token;
        req.uId = user._id;
        next();



    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }
};

module.exports = authenticate_me;
