const mongoose = require('mongoose');
const express = require('express');

// Create a schema for the book data
const bookSchema = new mongoose.Schema({
  Category:  { type: String, required: true },
  Bookname:  { type: String, required: true },
  Bookid:  { type: String, required: true },
  Author:  { type: String, required: true },
  Price:{ type: Number, required:true},
  Quantity:{ type: Number, default: 0,required:true },
  BookPhoto: {
    url: String,
    public_id: String
}
  // BookPdf: Buffer
});

// Create a model for the book data
const Book = mongoose.model('Book', bookSchema);
module.exports=Book;