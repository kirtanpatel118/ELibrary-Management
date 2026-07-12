import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import './our-books.css';

function OurBooks() {
  const [Books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);
  const [searchParams] = useSearchParams();
  const [searchQuery] = useState(searchParams.get('q') || '');

  useEffect(() => {
    localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks));
  }, [issuedBooks]);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      axios.get('https://elibrary-management.onrender.com/user/get-all-books', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.ok) {
            setBooks(response.data.book);
          }
        })
        .catch((error) => {
          console.error("Error fetching books:", error);
        });
    }
  }, []);

  const handleAddToCart = (book) => {
    if (issuedBooks.some(b => b._id === book._id)) {
      setIssuedBooks(prev => prev.filter(b => b._id !== book._id));
      setTotalIssuedBooks(prev => prev - 1);
    } else if (totalIssuedBooks < 2) {
      setIssuedBooks(prev => [...prev, book]);
      setTotalIssuedBooks(prev => prev + 1);
    }
  };

  const filteredBooks = Books.filter(book =>
    book.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.Author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="ob-page">
      <div className="ob-hero">
        <h1>Explore Our Collection</h1>
        <p>Find your next great read from our extensive library.</p>
      </div>

      <div className="ob-grid-wrap">
        <div className="ob-grid">
          {filteredBooks.map((Book) => {
            const issued = issuedBooks.some(b => b._id === Book._id);
            const limitReached = totalIssuedBooks >= 2 && !issued;
            return (
              <div className="ob-book-card" key={Book._id}>
                <img src={Book.BookPhoto.url} alt={Book.Bookname} loading="lazy" className="ob-book-img" />
                <div className="ob-book-body">
                  <p className="ob-book-title">{Book.Bookname}</p>
                  <p className="ob-book-author"><strong>Author:</strong> {Book.Author}</p>
                  <p className="ob-book-price">₹{Book.Price}</p>
                </div>
                <div className="ob-book-footer">
                  <button
                    className={`ob-issue-btn ${issued ? 'remove' : 'add'}`}
                    onClick={() => handleAddToCart(Book)}
                    disabled={limitReached}
                  >
                    {issued ? 'Remove Book' : limitReached ? 'Limit Reached' : 'Issue Book'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {totalIssuedBooks > 0 && (
        <div className="ob-selection-bar">
          <span>{totalIssuedBooks} book{totalIssuedBooks > 1 ? 's' : ''} selected — go to <strong>Cart</strong> in the menu to proceed</span>
        </div>
      )}
    </div>
  );
}

export default OurBooks;
