const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');


const { Home, allUser, ProfileUpdate, AllBooks } = require('../Controller/protectedRoute');
const { Registser,Login, auth_me,contact } = require('../Controller/authController');
const { RequestBook } = require('../Controller/RequestBook');
const authenticate_me = require('../Middleware/authenticate_me');
const { ForgotPassword } = require('../Controller/ForgotPassword');
const { UpdateFacultyProfile } = require('../Controller/UpdateProfile');




router.get('/',Home);
// router.post('/register',Register);
router.post('/login',Login);
// router.get('/alluser',allUser);
router.get('/auth',auth_me);
router.post('/contact',contact);
router.patch('/profile/update/:uID',ProfileUpdate);
// router.get('/get-all-books',AllBooks);
router.post('/request-book/:userEmail',RequestBook);
router.post('/forgot-password',ForgotPassword);
router.patch('/profile/update/:uID',UpdateFacultyProfile);

module.exports=router;
