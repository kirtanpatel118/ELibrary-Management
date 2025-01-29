
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/mini').then(() => {
  console.log("connected");
}).catch((err) => {
  console.error("not connected");
});


const facultySchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobileNo: {
      type: String,
      required: true
    },
    faculty_id: {
      type: String,
      required: true
    },
    dateOfJoining: {
      type: Date,
      required: true
    },
    dateOfLeaving: {
      type: Date,
      required: true
    },
    faculty_id: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },

    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    profilePicture: String,
    // coverPicture: String,
    about: String,
    livesin: String,
  },
  { timestamps: true }
);

facultySchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

  }
  catch (err) {
    next(err);
  }
});

facultySchema.methods.generateToken = async function () {

  try {
    const user = this;
    const token = jwt.sign({
      _id: user._id.toString(),
      email: this.email,
      mobileNo: this.mobileNo,
    },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '7d'
      });
    return token;
  }
  catch (err) {
    console.error(err);

  }

};




module.exports = (mongoose.model('Faculty', facultySchema));