const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const add = require('../Controller/Admin/Add');
const Book = require('../Model/Book');
<<<<<<< HEAD
const {getBook,updateBook,deleteBook}=require('../Controller/protectedRoute');
const IssuedBook = require('../Model/IssueBook');
const {  IssuedBooks, FinalIssue, ReturnBook } = require('../Controller/Admin/IssueBook');
const { Login } = require('../Controller/authController');
const { AllFaculties, AllStudents, UpdateFaculty, DeleteStudent, DeleteFaculty, UpdateStudent } = require('../Controller/Admin/ViewUsers');
const ViewBooks = require('../Controller/Admin/ViewBooks');
const { SendOTP, VerifyOTP } = require('../Controller/Admin/SendOTP');
const { ForgotPassword } = require('../Controller/ForgotPassword');
const Display_Users_Queiries = require('../Controller/Display_Users_Queries');
const { NewBookRequestFetch } = require('../Controller/RequestBook');
const { UpdateAdminProfile } = require('../Controller/UpdateProfile');

=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d

// const upload = multer({
//   dest: path.join(__dirname, './Books/Photos'), // Use absolute path
//   limits: {
//     fileSize: 20000000 // 20MB
//   },
//   fileFilter(_req, file, cb) {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Please upload an image'));
//     }
//   },
//     filename(req, file, cb) {
//       const userId = req.params.id;
//       const filename = `${userId}`;
//       cb(null, filename);
//   }
// });

// const bookPhotoUpload = upload.single([
//   { name: 'bookphoto', maxCount: 1}
// ]);


// router.post('/addbook', bookPhotoUpload, add);

const upload = multer({
  dest: path.join(__dirname, './Books/Photos'), // Use absolute path
  limits: {
    fileSize: 2000000 // 2MB
  },
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Please upload an image'));
    }
  },
  filename(req, file, cb) {
    const filename = `${req.params.uID}-${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

const bookPhotoUpload = upload.single('bookPhoto');

router.post('/addbook/:uID', bookPhotoUpload, add);
<<<<<<< HEAD
router.delete('/delete-book/:bookId', deleteBook);
router.get('/get-book/:bookId', getBook);
router.patch('/update-book/:bookId', updateBook);
router.get('/issued-books',IssuedBooks);
router.post('/final-issue/:uid',FinalIssue);
router.post('/login',Login);

router.post('/send-otp',SendOTP);
router.post('/verify-otp',VerifyOTP);

router.get('/get-faculties',AllFaculties);
router.get('/get-students',AllStudents);
router.patch('/student/:id',UpdateStudent);
router.patch('/faculty/:id',UpdateFaculty);
router.delete('/student/:id',DeleteStudent);
router.delete('/faculty/:id',DeleteFaculty);
router.get('/view-books',ViewBooks);
router.post('/return-book/:issuedBookId',ReturnBook);
router.post('/forgot-password',ForgotPassword);
router.get('/contact-queries',Display_Users_Queiries);
router.get('/book-requests',NewBookRequestFetch);
router.patch('/profile/update/:uID',UpdateAdminProfile);
// router.patch(`/book/update/${bID}`,);
=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d

module.exports = router;