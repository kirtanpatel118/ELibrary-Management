const express = require('express');
const multer = require('multer');
const Book = require('../../Model/Book');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const cloudinary = require('../../config/cloudinary_config');
const Student = require('../../Model/Student');




app.use(express.json()); // Add middleware to parse JSON

const Add = async (req, res) => {
  
    try {
      const bookData = req.body;
      console.log(bookData);
      const bookPhoto = req.file;
      const uId=req.params.id;
      // console.log("book photo:",bookPhoto);

      // Validate book data
      if (!bookData.Category || !bookData.Bookname || !bookData.Bookid || !bookData.Author || !bookData.Price ) {
        return res.status(400).json({ ok: false, message: 'Please provide all required fields' });
      }

      // const user = await Student.findById(uId);
      //   if (!user) {
      //       return res.status(404).send({ error: 'User not found' });
      //   }

        const result = await cloudinary.uploader.upload(bookPhoto.path, {
          upload_preset: "Books_Photos",
          width: 400//default was 300
          // crop:'scal'
      });
      console.log(result);
  
      // Create a new book document
      const book = new Book({
        Category: bookData.Category,
        Bookname: bookData.Bookname,
        Bookid: bookData.Bookid,
        Author: bookData.Author,
        Price:bookData.Price,
        Quantity:bookData.Quantity,
        BookPhoto: {
          public_id:result.public_id,
          url:result.secure_url
        }
      });
  
      // Save the book document
      await book.save();
  
      res.status(201).json({ ok: true, message: 'Book added successfully!' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ ok: false, message: 'Error adding book' });
    }
  
};

module.exports = Add;