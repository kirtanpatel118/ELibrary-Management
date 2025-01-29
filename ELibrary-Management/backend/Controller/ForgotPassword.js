const User = require('../Model/Student');
const Admin = require('../Model/Admin');
const Faculty = require('../Model/Faculty');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');



const ForgotPasswordUser = async (req, res) => {

  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required.' });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User  not found.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};


const ForgotPassword = async (req, res) => {
  const { email, role, newPassword } = req.body;

  // Validate input
  if (!email || !role || !newPassword) {
    return res.status(400).json({ error: 'Email, role, and new password are required.' });
  }

  try {
    // Find the user by email and role
    if (role === 'admin') {
      const user = await Admin.findOne({ email, role });
      if (!user) {
        return res.status(404).json({ error: 'User  not found.', ok: false });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: 'Password reset successfully!', ok: true });
    }
    else if (role === 'faculty') {
      const user = await Faculty.findOne({ email, role });
      if (!user) {
        return res.status(404).json({ error: 'User  not found.', ok: false });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      user.password = hashedPassword;
      await user.save();

      return res.status(200).json({ message: 'Password reset successfully!', ok: true });
    }
    else {
      //   const user = await User.findOne({ email, role });
      //   if (!user) {
      //     return res.status(404).json({ error: 'User  not found.',ok:false });
      //   }

      //   // Hash the new password
      //   const hashedPassword = await bcrypt.hash(newPassword, 10);

      //   // Update the user's password
      //   user.password = hashedPassword;
      //   await user.save();

      //   return res.status(200).json({ message: 'Password reset successfully!',ok:true });
      // }
      const { email, role, newPassword } = req.body;

      const student = await User.findOne({ email, role });
      if (!student) {
        return res.status(404).json({ error: 'Student not found.' });
      }

      // Hash the new password
      // const hashedPassword = await bcrypt.hash(newPassword, 10);
      // student.password = hashedPassword;

      // Update the student's password
      // console.log(student);
      student.password=newPassword;
      console.log(student)
      await student.save();

      return res.status(200).json({ message: 'Password reset successfully!' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while resetting the password.', ok: false });
  }

};

module.exports = { ForgotPassword };