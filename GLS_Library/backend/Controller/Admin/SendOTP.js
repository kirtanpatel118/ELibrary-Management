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
    from: `"GLS Library" <${process.env.EMAIL}>`,
    to: Email,
    subject: 'Your OTP Code – GLS E-Library',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes. Do not share it with anyone.`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>OTP Verification</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background:#134B70;padding:28px 32px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:1px;">
                GLS E-Library
              </h1>
              <p style="margin:4px 0 0;color:#a8d8ea;font-size:13px;">GLS University, Ahmedabad</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <h2 style="margin:0 0 8px;color:#134B70;font-size:20px;">OTP Verification</h2>
              <p style="margin:0 0 24px;color:#555;font-size:14px;line-height:1.6;">
                You requested a One-Time Password to reset your GLS Library account password.
                Use the code below — it expires in <strong>5 minutes</strong>.
              </p>

              <!-- OTP Box -->
              <div style="text-align:center;margin:0 0 28px;">
                <div style="display:inline-block;background:#f0f7ff;border:2px dashed #134B70;border-radius:12px;padding:18px 40px;">
                  <span style="font-size:40px;font-weight:800;letter-spacing:12px;color:#134B70;font-family:'Courier New',monospace;">${otp}</span>
                </div>
              </div>

              <p style="margin:0 0 16px;color:#555;font-size:13px;line-height:1.6;">
                If you did not request this OTP, you can safely ignore this email.
                Your account remains secure.
              </p>

              <div style="border-top:1px solid #eee;margin:24px 0;"></div>

              <p style="margin:0;color:#999;font-size:12px;">
                ⏱ This code expires in <strong>5 minutes</strong>.<br/>
                🔒 Never share this OTP with anyone.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#f9f9f9;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
              <p style="margin:0;color:#aaa;font-size:12px;">
                &copy; 2024 GLS Library &bull; Netaji Road, Opp. Law Garden, Ellisbridge, Ahmedabad – 380006<br/>
                <a href="mailto:inquiry@glsuniversity.ac.in" style="color:#134B70;text-decoration:none;">inquiry@glsuniversity.ac.in</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
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