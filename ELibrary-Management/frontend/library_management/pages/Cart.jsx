import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../src/App.css';
import toast from 'react-hot-toast';

function Cart() {
  const { setAuthUser , setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [Books, setBooks] = useState([]);
  const [user, setUser ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
    password: '',
    userID: ''
  });

  useEffect(() => {
    // Get token and authenticate user
    const token = localStorage.getItem('jwt_token');
    if (token) {
      axios.get('http://localhost:3000/user/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.ok) {
            setAuthUser (response.data.user);
            setIsLoggedIn(true);
            setUser (response.data.user);
            console.log("Login successfully", response.data.user);
          } else {
            console.log("Authentication failed");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Retrieve books from localStorage
    const storedBooks = JSON.parse(localStorage.getItem('issuedBooks'));
    if (storedBooks) {
      setBooks(storedBooks);
    }
  }, [setAuthUser , setIsLoggedIn]);

  const handleFinalIssue = () => {
    if (Books.length === 0) {
      toast.error("No books to issue.");
      return;
    }

    // Send issued books to the admin for approval
    const token = localStorage.getItem('jwt_token');
    const uid = user._id;

    axios.post(`http://localhost:3000/admin/final-issue/${uid}`, { books: Books }, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.data.ok) {
          toast.success("Books issued for admin approval!");
          // Clear the local storage and state
          localStorage.removeItem('issuedBooks'); // Clear issued books from local storage
          setBooks([]); // Clear the books from state
        } else {
          toast.error("Failed to issue books. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error issuing books:", error);
        toast.error("An error occurred while issuing books.");
      });
  };

  const handleAddToCart = (book) => {
    // Check if the book is already issued
    if (Books.some(issuedBook => issuedBook._id === book._id)) {
      // Remove the book from issuedBooks
      setBooks(prevBooks => prevBooks.filter(issuedBook => issuedBook._id !== book._id));
    } else {
      // Add the book to issuedBooks
      setBooks(prevBooks => [...prevBooks, book]);
    }
  };

  return (
    <>
      <h2>Issued Books ({Books.length})</h2>
      {Books.length === 0 ? (
        <p>No books issued</p>
      ) : (
        <section className="books-grid py-5">
          <div className="container">
            <div className="row g-4">
              {Books.map((Book) => (
                <div className="col-lg-3 col-md-4 col-sm-6" key={Book._id}>
                  <div className="card shadow-sm">
                    <img src={Book.BookPhoto.url} alt='book from backend' loading="fast" className="card-img-top" />
                    <div className="card-body text-center">
                      <h5 className="card-title">{Book.Bookname}</h5>
                      <p className="card-text text-muted">{Book.Author}</p>
                      <button
                        onClick={() => handleAddToCart(Book)}
                        className={`btn btn-sm ${Books.some(issuedBook => issuedBook._id === Book._id) ? 'btn-danger' : 'btn-primary'}`}
                      >
                        {Books.some(issuedBook => issuedBook._id === Book._id) ? 'Remove Book' : 'Issue Book'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <button className="add-to-cart-btn" onClick={handleFinalIssue} disabled={Books.length === 0}>
      Final Issue
       </button>
       
    </>
  );
}

export default Cart;