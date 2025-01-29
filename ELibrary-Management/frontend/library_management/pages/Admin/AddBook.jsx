import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import './AddBook.css'; // Import the separate CSS file

function AddBook() {
    const navigate = useNavigate();
    const [BookData, setBookData] = useState({
        Category: '',
        Bookname: '',
        Bookid: '',
        Author: '',
        Price: '',
        BookPhoto: null,
        Quantity:''
    });

    const [admin, setAdmin] = useState({
        firstname: '',
        lastname: '',
        email: '',
        mobileNo: '',
        course: '',
        enrollment: '',
        password: '',
        createdAt: '',
        updatedAt: '',
        userID: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            axios.get('http://localhost:3000/user/auth', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                    if (response.data.ok) {
                        const user = response.data.user;
                        if (user) {
                            setAdmin({
                                firstname: user.firstname,
                                lastname: user.lastname,
                                email: user.email,
                                mobileNo: user.mobileNo,
                                course: user.course,
                                enrollment: user.enrollment,
                                createdAt: user.createdAt,
                                updatedAt: user.updatedAt,
                                userID: user._id,
                            });
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, []);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...BookData, [name]: value });
    };

    const handleFileChange = (e) => {
        setBookData({ ...BookData, BookPhoto: e.target.files[0] });
    };

    const handleEdit = async (Book) => {
        navigate('/book/update', { state: { Book } });
    };

    const handleDelete = async (bookId) => {
        try {
            const swalWithBootstrapButtons = Swal.mixin({
                customclass: {
                    confirmButton: "btn btn-success",
                    cancelButton: "btn btn-danger"
                },
                buttonsStyling: false
            });
            swalWithBootstrapButtons.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel!",
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "Your Book has been deleted.",
                        icon: "success"
                    });
                    const response = axios.delete(`http://localhost:3000/admin/delete-book/${bookId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`,
                        },
                    });
                    if (response.data.ok) {
                        toast.success('Book deleted successfully!');
                        setBooks(Books.filter((book) => book._id !== bookId));
                    }

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithBootstrapButtons.fire({
                        title: "Cancelled",
                        text: "Your Book is safe :)",
                        icon: "error"
                    });
                    console.log("Book is not deleted.");
                }
            });
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('bookPhoto', BookData.BookPhoto);
        Object.keys(BookData).forEach((key) => {
            if (key !== 'BookPhoto') {
                formData.append(key, BookData[key]);
            }
        });

        const uID = admin.userID;

        try {
            const response = await axios.post(`http://localhost:3000/admin/addbook/${uID}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.data.ok) {
                toast.success('add Successfully!');
                console.log('Response from server:', response.data);
            }
        } catch (err) {
            toast.error(err.response?.data?.message);
            console.error("something wrong");
        }
    };

    const [Books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        if (token) {
            axios.get('http://localhost:3000/user/get-all-books', {
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

    return (
        <>
            <h1>Admin</h1>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card book-form-card shadow-lg">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">Add a New Book</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="category" className="form-label">Book Category</label>
                                        <select className="form-select" id="category" name="Category" onChange={handleOnChange} required>
                                            <option value="" selected disabled>Choose category</option>
                                            <option value="Programming">Programming</option>
                                            <option value="Law">Law</option>
                                            <option value="Commerce">Commerce</option>
                                            <option value="Designing">Designing</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="bookName" className="form-label">Book Name</label>
                                        <input type="text" className="form-control" id="Bookname" placeholder="Enter book name" name="Bookname" value={BookData.Bookname} onChange={handleOnChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="bookID" className="form-label">ISDN number</label>
                                        <input type="text" className="form-control" id="BookID" placeholder="Enter book ID" name="Bookid" value={BookData.Bookid} onChange={handleOnChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="authorName" className="form-label">Author Name</label>
                                        <input type="text" className="form-control" id="authorName" placeholder="Enter author name" name="Author" value={BookData.Author} onChange={handleOnChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input type="text" className="form-control" id="price" name="Price" value={BookData.Price} onChange={handleOnChange} placeholder='enter price' required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="" className="form-label">Quantity</label>
                                        <input type="number" className="form-control" id="quantity" name="Quantity" value={BookData.Quantity} onChange={handleOnChange} placeholder='Quantity of Book' required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="bookPhoto" className="form-label">Book Photo</label>
                                        <input type="file" className="form-control" id="bookPhoto" name="BookPhoto" onChange={handleFileChange} required />
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-add-book">Add Book</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row book-grid">
                    {Books.map((Book) => (
                        <div key={Book._id} className="col-lg-10 col-md-11 col-sm-8">
                            <div className="book-card">
                                {Book.BookPhoto ? (
                                    <img
                                        src={Book.BookPhoto.url}
                                        alt='book from backend'
                                        loading="fast"
                                    />
                                ) : (
                                    <p>No image available</p> // Fallback for books without a photo
                                )}
                                <div className="book-details">
                                    <h5>{Book.Bookname}</h5>
                                    <p>{Book.Author}</p>
                                    <p className="book-price">${Book.Price}</p>
                                </div>
                                <div className="card-actions">
                                    <button className="btn btn-warning" onClick={() => handleEdit(Book)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(Book._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
}

export default AddBook;