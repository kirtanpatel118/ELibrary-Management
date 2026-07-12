
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("connected");
}).catch((err) => {
  console.error("not connected", err.message);
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
