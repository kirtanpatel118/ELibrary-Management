const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const otpStore = {};

const generateOTP = (length = 6) => {
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

const SendOTP = async (req, res) => {
  const { Email } = req.body;

  if (!Email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  const otp = generateOTP();
  otpStore[Email] = { otp, expiresAt: Date.now() + 300000 }; // Store OTP with expiration time

  const mailOptions = {
    from: process.env.EMAIL,
    to: Email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending OTP', error });
    }
    res.status(200).json({ message: 'OTP sent successfully!', ok: true });
  });
};

const VerifyOTP = async (req, res) => {
  const { Email, received_otp } = req.body;

  if (!Email || !received_otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  const normalizedEmail = Email.trim().toLowerCase();
  const storedOtp = otpStore[normalizedEmail];

  if (!storedOtp) {
    return res.status(400).json({
      message: 'No OTP found or it may have expired. Please request a new one.',
    });
  }

  // Check if OTP has expired
  if (storedOtp.expiresAt < Date.now()) {
    delete otpStore[normalizedEmail]; // Remove expired OTP
    return res.status(400).json({ message: 'OTP expired. Please request a new one.' });
  }

  // Check if the received OTP matches the stored OTP
  if (storedOtp.otp === received_otp) {
    delete otpStore[normalizedEmail]; // OTP is used, so remove it
    return res.status(200).json({ message: 'OTP verified successfully!', ok: true });
  }

  return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
};

module.exports = { SendOTP, VerifyOTP };