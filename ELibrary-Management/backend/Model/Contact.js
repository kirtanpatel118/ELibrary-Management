
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/mini').then(() => {
  console.log("connected");
}).catch((err) => {
  console.error("not connected");
});


const ContactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);
const Contact= mongoose.model("Contact", ContactSchema);

module.exports=Contact;
