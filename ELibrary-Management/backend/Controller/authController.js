const Student = require('../Model/Student');
const Admin = require('../Model/Admin');
const Faculty = require('../Model/Faculty');
const Contact = require('../Model/Contact');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

// Registration function
const Register = async (req, res) => {
    console.log('register route from backend');
    const { email, mobileNo, role, password } = req.body;

    try {
        let exist_user;
        if (role === 'student') {
            exist_user = await Student.findOne({ email }) || await Student.findOne({ mobileNo });
        } else if (role === 'faculty') {
            exist_user = await Faculty.findOne({ email }) || await Faculty.findOne({ mobileNo });
        } else {
            exist_user = await Admin.findOne({ email }) || await Admin.findOne({ mobileNo });
        }

        if (exist_user) {
            return res.status(400).json({ ok: false, message: 'Email or mobile number is already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const Model = role === 'student' ? Student : role === 'faculty' ? Faculty : Admin;
        const newUser = new Model({ ...req.body, password: hashedPassword });

        await newUser.save();
        console.log("User registered successfully:", newUser);

        return res.status(201).json({ ok: true, message: 'Registration complete' });
    } catch (error) {
        console.error("REGISTER FAILED =>", error);
        return res.status(500).json({ ok: false, message: 'Error in registration, please try again' });
    }
};

// Login function
const Login = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let exist_user;
        if (role === 'admin') {
            exist_user = await Admin.findOne({ email });
        } else if (role === 'faculty') {
            exist_user = await Faculty.findOne({ email });
        } else {
            exist_user = await Student.findOne({ email });
        }

        if (!exist_user) {
            return res.status(404).json({ ok: false, message: 'User not found' });
        }

        // Check password
        const isValidPassword = await bcrypt.compare(password, exist_user.password);
        if (!isValidPassword) {
            return res.status(401).json({ ok: false, message: 'Incorrect password' });
        }

        // Generate JWT Token
        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({ ok: false, message: 'JWT secret key is not defined' });
        }
        const token = jwt.sign(
            { id: exist_user._id, role: exist_user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ ok: true, message: 'Login successful', token, userId: exist_user._id.toString() });
    } catch (err) {
        console.error("LOGIN ERROR =>", err);
        return res.status(500).json({ ok: false, message: 'Login failed' });
    }
};

// Token validation and user retrieval
const auth_me = async (req, res) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, Token not provided" });
    }

    try {
        const jwtToken = token.replace("Bearer ", "").trim();
        // @ts-ignore
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        let user;
        if (isVerified.role === 'student') {
            user = await Student.findById(isVerified.id);
        } else if (isVerified.role === 'faculty') {
            user = await Faculty.findById(isVerified.id);
        } else if (isVerified.role === 'admin') {
            user = await Admin.findById(isVerified.id);
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json({ message: 'Token is valid', ok: true, user });
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Unauthorized. Invalid token" });
    }
};

// Contact form submission
const contact = async (req, res) => {
    try {
        const user_contact_data = new Contact(req.body);
        await user_contact_data.save();
        return res.json({ ok: true, message: 'Contact information saved' });
    } catch (error) {
        console.error("CONTACT ERROR =>", error);
        return res.status(500).json({ ok: false, message: 'Error in contact form submission' });
    }
};

module.exports = { Register, Login, auth_me, contact };
