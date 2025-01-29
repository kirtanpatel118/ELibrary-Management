const mongoose = require('mongoose');
const express = require('express');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/book').then(() => {
    console.log("connected");
  }).catch((err) => {
    console.error("not connected");
  });

// Create a schema for the book data
const bookSchema = new mongoose.Schema({
<<<<<<< HEAD
  Category:  { type: String, required: true },
  Bookname:  { type: String, required: true },
  Bookid:  { type: String, required: true },
  Author:  { type: String, required: true },
  Price:{ type: Number, required:true},
  Quantity:{ type: Number, default: 0,required:true },
=======
  Category: String,
  Bookname: String,
  Bookid: String,
  Author: String,
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
  BookPhoto: {
    url: String,
    public_id: String
}
  // BookPdf: Buffer
});

// Create a model for the book data
const Book = mongoose.model('Book', bookSchema);
module.exports=Book;