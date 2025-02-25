const express = require('express');
  
const IssueBook = require('../../Model/IssueBook');
const Book=require('../../Model/Book');


const IssuedBooks= async (req, res) => {
    try {
      const issuedBooks = await IssueBook.find()
        .populate('userId', 'firstname email') // Populate user details
        .populate('bookId', 'Bookname Author BookPhoto'); // Populate book details
      console.log(issuedBooks)
      res.json({ ok: true, issuedBooks });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, message: 'Error fetching issued books' });
    }
  };


// Final Issue Endpoint
// const finalIssue= async (req, res) => {
//   const { books } = req.body;
//   const userId = req.params.uid; // Assuming user ID is stored in the token

//   try {
//     // Loop through each book and create an IssuedBook entry
//     for (const book of books) {
//       const issuedBook = new IssueBook({
//         userId,
//         bookId: book._id // Assuming book has an _id field
//       });
//       await issuedBook.save();
//     }
//     res.json({ ok: true, message: 'Books issued for admin approval!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ ok: false, message: 'Error issuing books' });
//   }
// };


// Final Issue Endpoint
const FinalIssue = async (req, res) => {
  const { books } = req.body;
  const userId = req.params.uid; // Assuming user ID is stored in the token

  try {
    // Loop through each book and create an IssuedBook entry
    for (const book of books) {
      const bookDoc = await Book.findById(book._id);
      // console.log(bookDoc);
      if (!bookDoc) {
        return res.status(404).json({ ok: false, message: `Book not found: ${book._id}` });
      }

      if (bookDoc.Quantity <= 0) {
        return res.status(400).json({ ok: false, message: `Book not available: ${bookDoc.Bookname}` });
      }

      // Decrement book quantity
      bookDoc.Quantity -= 1;
      // console.log('-->',bookDoc.Quantity);
      await bookDoc.save();

      const issuedBook = new IssueBook({
        userId,
        bookId: book._id // Assuming book has an _id field
      });
      await issuedBook.save();
    }
    res.json({ ok: true, message: 'Books issued for admin approval!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error issuing books' });
  }
};


const ReturnBook= async (req, res) => {
  const { issuedBookId } = req.params;
  const { bookId } = req.body; // Get the bookId from the request body

  try {
    // Find the issued book record
    const issuedBook = await IssueBook.findById(issuedBookId);
    if (!issuedBook) {
      return res.status(404).json({ ok: false, message: 'Issued book not found' });
    }

    // Check if the book has already been returned
    if (issuedBook.returned) {
      return res.status(400).json({ ok: false, message: 'This book has already been returned' });
    }

    // Update the issued book record to mark it as returned
    issuedBook.returned = true; // Assuming you have a 'returned' field in your IssuedBook model
    await issuedBook.save();

    // Find the book and increase its quantity
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ ok: false, message: 'Book not found' });
    }

    // Increment the book quantity
    book.Quantity += 1; // Assuming you have a 'quantity' field in your Book model
    await book.save();

    res.json({ ok: true, message: 'Book returned successfully and quantity updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'An error occurred while returning the book' });
  }
};


module.exports={IssuedBooks,FinalIssue,ReturnBook};