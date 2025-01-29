import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './IssuedBooks.css';

const IssuedBooks = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/issued-books', {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        if (response.data.ok) {
          setIssuedBooks(response.data.issuedBooks);
        } else {
          toast.error('Failed to fetch issued books');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while fetching issued books');
      }
    };

    fetchIssuedBooks();
  }, []);

  const handleReturnBook = async (issuedBookId, bookId) => {
    try {
      const response = await axios.post(`http://localhost:3000/admin/return-book/${issuedBookId}`, { bookId });
      if (response.data.ok) {
        toast.success('Book returned successfully');
        // Update the issuedBooks state to reflect the returned book
        setIssuedBooks(prevBooks =>
          prevBooks.map(book =>
            book._id === issuedBookId ? { ...book, returned: true } : book
          )
        );
      } else {
        toast.error('Failed to return the book');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while returning the book');
    }
  };

  return (
    <div className="issued-books-page-container">
      <Toaster />
      <h2 className="issued-books-header">Issued Books</h2>
      {issuedBooks.length === 0 ? (
        <p className="no-issued-books-message">No books have been issued yet.</p>
      ) : (
        <div className="issued-books-table-container">
          <table className="issued-books-table table">
            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Issued At</th>
                <th>Return By</th>
                <th>Returned Book</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((issuedBook) => (
                <tr key={issuedBook._id}>
                  <td className="issued-books-user-info">
                    {issuedBook.userId.firstname} <br />
                    {issuedBook.userId.email}
                  </td>
                  <td className="issued-books-book-info">
                    {issuedBook.bookId ? issuedBook.bookId.Bookname : 'Unknown Book'} <br />
                    by {issuedBook.bookId ? issuedBook.bookId.Author : 'Unknown Author'}
                  </td>
                  <td className="issued-books-date-column">
                    {new Date(issuedBook.issuedAt).toLocaleString()}
                  </td>
                  <td className="issued-books-date-column">
                    {new Date(issuedBook.returnBy).toLocaleString()}
                  </td>
                  <td className="issued-books-return-column">
                    {issuedBook.returned ? (
                      <button className="btn btn-success" disabled>
                        Returned
                      </button>
                    ) : (
                      <button className="btn btn-danger" onClick={() => handleReturnBook(issuedBook._id, issuedBook.bookId._id)}>
                        Not Returned
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IssuedBooks;