import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import './ViewBooks.css';

function ViewBooks() {
    const navigate = useNavigate();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = () => {
        const token = localStorage.getItem('jwt_token');
        axios.get('http://localhost:3000/user/get-all-books', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (res.data.ok) setBooks(res.data.book);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchBooks(); }, []);

    const handleEdit = (book) => {
        navigate('/book/update', { state: { Book: book } });
    };

    const handleDelete = (bookId) => {
        const swal = Swal.mixin({
            customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' },
            buttonsStyling: false,
        });
        swal.fire({
            title: 'Delete this book?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.delete(`http://localhost:3000/admin/delete-book/${bookId}`, {
                        headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
                    });
                    if (res.data.ok) {
                        toast.success('Book deleted successfully!');
                        setBooks((prev) => prev.filter((b) => b._id !== bookId));
                    } else {
                        toast.error('Failed to delete book.');
                    }
                } catch {
                    toast.error('An error occurred.');
                }
            }
        });
    };

    const filtered = books;

    return (
        <div className="vb-page">
            <Toaster position="top-right" reverseOrder={false} />

            {/* ── Header bar ── */}
            <div className="vb-topbar">
                <div>
                    <h1 className="vb-title">Manage Books</h1>
                    <p className="vb-subtitle">{books.length} book{books.length !== 1 ? 's' : ''} in the library</p>
                </div>
                <button className="vb-add-btn" onClick={() => navigate('/admin/add-book')}>
                    + Add New Book
                </button>
            </div>

            {/* ── States ── */}
            {loading ? (
                <div className="vb-state">Loading books…</div>
            ) : filtered.length === 0 ? (
                <div className="vb-state">
                    {search ? `No results for "${search}"` : 'No books in the library yet.'}
                </div>
            ) : (
                <div className="vb-grid">
                    {filtered.map((book) => (
                        <div key={book._id} className="vb-card">
                            {book.BookPhoto?.url ? (
                                <img src={book.BookPhoto.url} alt={book.Bookname} loading="lazy" className="vb-card-img" />
                            ) : (
                                <div className="vb-card-no-img">No Image</div>
                            )}
                            <div className="vb-card-body">
                                <span className="vb-card-category">{book.Category}</span>
                                <p className="vb-card-title">{book.Bookname}</p>
                                <p className="vb-card-author"><strong>Author:</strong> {book.Author}</p>
                                <div className="vb-card-meta">
                                    <span className="vb-card-price">₹{book.Price}</span>
                                    <span className="vb-card-qty">Qty: {book.Quantity}</span>
                                </div>
                            </div>
                            <div className="vb-card-actions">
                                <button className="vb-btn-edit" onClick={() => handleEdit(book)}>Edit</button>
                                <button className="vb-btn-delete" onClick={() => handleDelete(book._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewBooks;
