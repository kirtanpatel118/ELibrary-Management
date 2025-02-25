const db = require('../config/dbConnection');
const Student = require('../Model/Student');
const Book=require('../Model/Book');        
const mongoose = require('mongoose');

const Home = async (req, res) => {
    console.log('home route from backend');

    return res.json({ msg: 'home route from backend', ok: true });

}


const allUser = async (req, res) => {
    try {
        // const crete_student = ` CREATE TABLE users (
        // firstname VARCHAR(255) NOT NULL,
        // lastname VARCHAR(255) NOT NULL,
        // email VARCHAR(255) NOT NULL UNIQUE,
        // mobileNo VARCHAR(255) NOT NULL,
        // course VARCHAR(255) NOT NULL,
        // enrollment VARCHAR(255) NOT NULL,
        // password VARCHAR(255) NOT NULL,
        // confirmPassword VARCHAR(255) NOT NULL) `;


        // db.query(createTableQuery, (err, results) => {
        //     if (err) {
        //         console.error('error creating table:', err);
        //         return;
        //     }
        //     console.log('table created');
        // console.log("all user");



        // });
    }
    catch (err) {
        console.error(err);
    }
};



const ProfileUpdate = async (req, res) => {
    try {
        const id = req.params.uID;
        const body = req.body;
        console.log(id, " !! ", body);
        const updatedUser = await Student.findByIdAndUpdate(id, body, { new: true });
        if (!updatedUser) {
            console.log('profile update nahi hui ')
            return res.status(404).json({ ok: false, message: 'User not found' });
        }
        console.log("profile update ho gai ");
        res.json({ ok: true, message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};


const AllBooks=async(req,res)=>{
    
    try {
        // const posts = await Post.find().populate('postedBy', '_id name').populate('like', '_id name').populate('comment.postedBy', '_id name');
        const book = await Book.find();
        // console.log("book seneded to clinet");
        // console.log(':',book);
         return res.json({ book, ok: true });
    } catch (error) {
        return res.status(400).json({ error: 'Error fetching posts', error ,ok:false});
    }
};

const deleteBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findByIdAndDelete(bookId);
      if (!book) {
        return res.status(404).json({ok:false, error: 'Book not found' });
      }
        res.json({ message: 'Book deleted successfully' ,ok:true});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error deleting book' });
    }
  };


const updateBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
      if (!book) {
        return res.status(404).json({ok:false, error: 'Book not found' });
      }
      res.json({ message: 'Book updated successfully' ,ok:true});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating book' });
    }
  };

  const getBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ book,ok:true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching book' });
    }
  };
  




module.exports = { Home, allUser,ProfileUpdate,AllBooks,deleteBook,updateBook,getBook };