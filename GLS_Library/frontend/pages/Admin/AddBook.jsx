import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './AddBook.css';

function AddBook() {
    const navigate = useNavigate();
    const [BookData, setBookData] = useState({
        Category: '',
        Bookname: '',
        Bookid: '',
        Author: '',
        Price: '',
        BookPhoto: null,
        Quantity: ''
    });
    const [admin, setAdmin] = useState({ userID: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            axios.get('http://localhost:3000/user/auth', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    if (res.data.ok) setAdmin({ userID: res.data.user._id });
                })
                .catch(console.error);
        }
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...BookData, [name]: value });
    };

    const handleFileChange = (e) => {
        setBookData({ ...BookData, BookPhoto: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!BookData.BookPhoto) {
            toast.error('Please select a book cover photo.');
            return;
        }
        setSubmitting(true);
        const formData = new FormData();
        formData.append('bookPhoto', BookData.BookPhoto);
        Object.keys(BookData).forEach((key) => {
            if (key !== 'BookPhoto') formData.append(key, BookData[key]);
        });

        try {
            const response = await axios.post(`http://localhost:3000/admin/addbook/${admin.userID}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.ok) {
                toast.success('Book added successfully!');
                setBookData({ Category: '', Bookname: '', Bookid: '', Author: '', Price: '', BookPhoto: null, Quantity: '' });
                // reset file input
                document.getElementById('bookPhoto').value = '';
            } else {
                toast.error(response.data.message || 'Failed to add book.');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="addbook-page">
            <div className="addbook-form-card">
                <div className="addbook-form-header">
                    <h2>Add a New Book</h2>
                    <p>Fill in the details below to add a book to the library</p>
                </div>
                <div className="addbook-form-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Book Category</label>
                            <select
                                className="form-select"
                                id="category"
                                name="Category"
                                value={BookData.Category}
                                onChange={handleOnChange}
                                required
                            >
                                <option value="" disabled>Choose category</option>
                                <option value="Programming">Programming</option>
                                <option value="Law">Law</option>
                                <option value="Commerce">Commerce</option>
                                <option value="Designing">Designing</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="Bookname" className="form-label">Book Name</label>
                            <input type="text" className="form-control" id="Bookname" placeholder="Enter book name" name="Bookname" value={BookData.Bookname} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="BookID" className="form-label">ISBN Number</label>
                            <input type="text" className="form-control" id="BookID" placeholder="Enter ISBN / book ID" name="Bookid" value={BookData.Bookid} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="authorName" className="form-label">Author Name</label>
                            <input type="text" className="form-control" id="authorName" placeholder="Enter author name" name="Author" value={BookData.Author} onChange={handleOnChange} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price (₹)</label>
                            <input type="text" className="form-control" id="price" name="Price" value={BookData.Price} onChange={handleOnChange} placeholder="Enter price" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="quantity" className="form-label">Quantity</label>
                            <input type="number" className="form-control" id="quantity" name="Quantity" value={BookData.Quantity} onChange={handleOnChange} placeholder="Number of copies" min="1" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="bookPhoto" className="form-label">Book Cover Photo</label>
                            <input type="file" className="form-control" id="bookPhoto" name="BookPhoto" onChange={handleFileChange} accept="image/*" required />
                        </div>
                        <button type="submit" className="addbook-submit-btn" disabled={submitting}>
                            {submitting ? 'Adding...' : 'Add Book'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button
                            onClick={() => navigate('/admin/view-books')}
                            style={{
                                background: 'none', border: 'none', color: '#134B70',
                                fontSize: '13px', cursor: 'pointer', textDecoration: 'underline'
                            }}
                        >
                            View &amp; manage all books →
                        </button>
                    </div>
                </div>
            </div>
            <Toaster position="top-right" reverseOrder={false} />
        </div>
    );
}

export default AddBook;
