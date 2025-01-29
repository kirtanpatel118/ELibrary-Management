// models/IssuedBook.js
const mongoose = require('mongoose');
const Student=require('../Model/Student');
const Book=require('../Model/Book');


const IssuedBookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  issuedAt: { type: Date, default: Date.now },
  returnBy: { type: Date, default: () => new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) }, // 15 days from now
  returned: { type: Boolean, default: false } // Field to track if the book has been returned
});

module.exports = mongoose.model('IssuedBook', IssuedBookSchema);