const express =require('express');
const router=express.Router();
const { Home, allUser, ProfileUpdate, AllBooks } = require('../Controller/protectedRoute');
const { Register,Login, auth_me,contact } = require('../Controller/authController');
<<<<<<< HEAD
const SearchBook = require('../Controller/SearchBook');
const { ForgotPassword } = require('../Controller/ForgotPassword');
const { UpdateStudentProfile } = require('../Controller/UpdateProfile');
=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d



router.get('/',Home);
router.post('/register',Register);
router.post('/login',Login);
router.get('/alluser',allUser);
router.get('/auth',auth_me);
router.post('/contact',contact);
router.patch('/profile/update/:uID',ProfileUpdate);
router.get('/get-all-books',AllBooks);
<<<<<<< HEAD
router.post('/search-book',SearchBook);
router.post('/forgot-password',ForgotPassword);
router.patch('/profile/update/:uID',UpdateStudentProfile);
=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d

module.exports=router;
