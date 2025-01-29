// const { Sequelize, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('mini', 'root', 'dhanraj@08', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

// const Student = sequelize.define('Student', {
//   firstname: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastname: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true,
//     validate: {
//       isEmail: true
//     }
//   },
//   mobileNo: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   course: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   enrollment: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   confirmPassword: {
//     type: DataTypes.STRING,
//     allowNull: false
//   }
// });

// sequelize.sync().then(() => {
//   console.log('Student model synced with database');
// });

// module.exports={Student};


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

mongoose.connect('mongodb://127.0.0.1:27017/mini').then(() => {
  console.log("connected");
}).catch((err) => {
  console.error("not connected");
});


const StudentSchema = mongoose.Schema(
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
    course: {
      type: String,
      required: true
    },
    enrollment: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
<<<<<<< HEAD
    role: {
      type: String,
      required: true
    },

    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
=======

    // role: {
    //   type: String,
    //   required: true
    // },

    isAdmin: {
      type: Boolean,
      default: false,
    },
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
    profilePicture: String,
    // coverPicture: String,
    about: String,
    livesin: String,
  },
  { timestamps: true }
);

StudentSchema.pre('save', async function (next) {
  const user = this;

<<<<<<< HEAD
  // if (!user.isModified('password')) {
  //   next();
  // }
=======
  if (!user.isModified('password')) {
    next();
  }
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;

  }
  catch (err) {
    next(err);
  }
});

StudentSchema.methods.generateToken = async function () {

  try {
    const user = this;
    const token = jwt.sign({
      _id: user._id.toString(),
<<<<<<< HEAD
      role:this.role,
=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
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




module.exports = (mongoose.model('Student', StudentSchema));