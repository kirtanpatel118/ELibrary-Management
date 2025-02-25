// models/BookRequest.js

const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  firstname:{ type: String, required: true },
  lastname:{ type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  comments: { type: String, default: '' },
  requestedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BookRequest', bookRequestSchema);

