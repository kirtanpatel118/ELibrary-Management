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
      axios.get('https://elibrary-management.onrender.com/user/auth', {
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

    axios.post(`https://elibrary-management.onrender.com/admin/final-issue/${uid}`, { books: Books }, {
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
    <div style={{ minHeight: '70vh', paddingTop: '90px', paddingBottom: '40px', background: '#f4f6f9' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h2 style={{ color: '#134B70', fontWeight: 700, fontSize: '28px' }}>
          My Cart
          <span style={{
            display: 'inline-block', marginLeft: '10px',
            background: '#134B70', color: '#fff',
            borderRadius: '20px', padding: '2px 14px', fontSize: '16px', verticalAlign: 'middle'
          }}>{Books.length}</span>
        </h2>
        {Books.length > 0 && (
          <p style={{ color: '#666', marginTop: '6px' }}>Review your selected books before submitting for issue</p>
        )}
      </div>

      {Books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>📚</div>
          <h4 style={{ color: '#555', marginBottom: '8px' }}>Your cart is empty</h4>
          <p style={{ color: '#999', marginBottom: '24px' }}>Browse our collection and add books to issue.</p>
          <a href="/books" style={{
            background: '#134B70', color: '#fff', padding: '10px 28px',
            borderRadius: '40px', textDecoration: 'none', fontWeight: 600, fontSize: '15px'
          }}>Browse Books</a>
        </div>
      ) : (
        <>
          <section className="books-grid py-3">
            <div className="container">
              <div className="row g-4">
                {Books.map((Book) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={Book._id}>
                    <div className="card shadow-sm h-100" style={{ borderRadius: '12px', overflow: 'hidden', border: 'none' }}>
                      <img src={Book.BookPhoto.url} alt={Book.Bookname} loading="lazy"
                        className="card-img-top" style={{ height: '200px', objectFit: 'cover' }} />
                      <div className="card-body text-center">
                        <h5 className="card-title" style={{ color: '#134B70', fontSize: '15px', fontWeight: 600 }}>{Book.Bookname}</h5>
                        <p className="card-text text-muted" style={{ fontSize: '13px' }}>{Book.Author}</p>
                        <button
                          onClick={() => handleAddToCart(Book)}
                          style={{
                            background: '#e74c3c', color: '#fff', border: 'none',
                            borderRadius: '40px', padding: '6px 18px', fontSize: '13px',
                            fontWeight: 600, cursor: 'pointer'
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Issue Button */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={handleFinalIssue}
              style={{
                background: '#134B70', color: '#fff', border: 'none',
                borderRadius: '40px', padding: '14px 48px',
                fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(19,75,112,0.3)',
                transition: 'background 0.2s'
              }}
              onMouseOver={e => e.target.style.background = '#0d3554'}
              onMouseOut={e => e.target.style.background = '#134B70'}
            >
              Submit for Issue ({Books.length} {Books.length === 1 ? 'book' : 'books'})
            </button>
            <p style={{ color: '#999', fontSize: '13px', marginTop: '10px' }}>
              Books will be sent to admin for approval
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;