import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthProvider';
import toast from 'react-hot-toast';
import './UserProfile.css';

function MyBooks() {
  const { authUser } = useAuth();
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) return;

    axios.get('http://localhost:3000/user/auth', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.data.ok) {
          const userId = res.data.user._id;
          return axios.get(`http://localhost:3000/user/my-issued-books/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
      })
      .then((res) => {
        if (res && res.data.ok) {
          setIssuedBooks(res.data.issuedBooks);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load your books');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="profile-container" style={{ marginTop: '100px', padding: '20px 32px 60px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>My Issued Books</h2>
      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : issuedBooks.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No books issued yet.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#2c3e50', color: '#fff' }}>
                <th style={th}>Book Name</th>
                <th style={th}>Author</th>
                <th style={th}>Category</th>
                <th style={th}>Issued On</th>
                <th style={th}>Return By</th>
                <th style={th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((item) => (
                <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={td}>{item.bookId?.Bookname || 'N/A'}</td>
                  <td style={td}>{item.bookId?.Author || 'N/A'}</td>
                  <td style={td}>{item.bookId?.Category || 'N/A'}</td>
                  <td style={td}>{new Date(item.issuedAt).toLocaleDateString()}</td>
                  <td style={td}>{new Date(item.returnBy).toLocaleDateString()}</td>
                  <td style={td}>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: item.returned ? '#27ae60' : '#e74c3c',
                      color: '#fff',
                      fontSize: '13px'
                    }}>
                      {item.returned ? 'Returned' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = { padding: '12px 16px', textAlign: 'left' };
const td = { padding: '10px 16px' };

export default MyBooks;
