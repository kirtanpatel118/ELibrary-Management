import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './IssuedBooksUser.css';

function IssuedBooksUser() {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return;
    axios.get('http://localhost:3000/user/get-issued-books', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.ok) setIssuedBooks(res.data.issuedBooks || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="ibu-page">
      <div className="ibu-header">
        <h1 className="ibu-title">My Issued Books</h1>
        <p className="ibu-subtitle">{issuedBooks.length} book{issuedBooks.length !== 1 ? 's' : ''} currently issued</p>
      </div>

      {loading ? (
        <div className="ibu-state">Loading…</div>
      ) : issuedBooks.length === 0 ? (
        <div className="ibu-empty">
          <p>You have no books issued at the moment.</p>
          <button className="ibu-browse-btn" onClick={() => navigate('/books')}>Browse Books</button>
        </div>
      ) : (
        <div className="ibu-list">
          {issuedBooks.map((item, index) => (
            <div key={item._id || index} className="ibu-row">
              <div className="ibu-row-info">
                <span className="ibu-book-name">{item.bookId?.Bookname || 'Unknown Book'}</span>
                <span className="ibu-book-author">by {item.bookId?.Author || '—'}</span>
              </div>
              <span className="ibu-badge">Issued</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IssuedBooksUser;
