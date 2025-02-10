/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import React from 'react';

function Admin() {
  const navigate = useNavigate();
  const [BookData, setBookData] = useState({
    Category: '',
    Bookname: '',
    Bookid: '',
    Author: '',
    Price: '',
    BookPhoto: null,
  });

  const [admin, setAdmin] = useState({});
  const [Books, setBooks] = useState([]);
  // @ts-ignore
  // @ts-ignore
  const [issuedBooks, setIssuedBooks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      axios.get('http://localhost:3000/user/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.ok) {
            setAdmin(response.data.user);
          } else {
            console.log("Authentication failed");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3000/admin/issued-books')
      .then((response) => {
        if (response.data.ok) {
          setIssuedBooks(response.data.issuedBooks);
        } else {
          toast.error('Failed to fetch issued books');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('An error occurred while fetching issued books');
      });

    axios.get('http://localhost:3000/user/get-all-books')
      .then((response) => {
        if (response.data.ok) {
          setBooks(response.data.book);
        }
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...BookData, [name]: value });
  };

  const handleFileChange = (e) => {
    setBookData({ ...BookData, BookPhoto: e.target.files[0] });
  };

  const handleEdit = (Book) => {
    navigate('/book/update', { state: { Book } });
  };

  const handleDelete = (bookId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/admin/delete-book/${bookId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwt_token')}` },
        })
          .then(() => {
            toast.success('Book deleted successfully!');
            // @ts-ignore
            setBooks(Books.filter((book) => book._id !== bookId));
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
          });

        Swal.fire("Deleted!", "Your book has been deleted.", "success");
      } else {
        Swal.fire("Cancelled", "Your book is safe :)", "error");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(BookData).forEach((key) => formData.append(key, BookData[key]));

    try {
      // @ts-ignore
      const response = await axios.post(`http://localhost:3000/admin/addbook/${admin.userID}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.ok) {
        toast.success('Book added successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Toaster />
      <h1>Admin</h1>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="text-center mb-4">Add a New Book</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Book Category</label>
                    <select className="form-select" name="Category" onChange={handleOnChange} required>
                      <option value="" disabled selected>Choose category</option>
                      <option value="Programming">Programming</option>
                      <option value="Law">Law</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Designing">Designing</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Book Name</label>
                    <input type="text" className="form-control" name="Bookname" value={BookData.Bookname} onChange={handleOnChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">ISDN Number</label>
                    <input type="text" className="form-control" name="Bookid" value={BookData.Bookid} onChange={handleOnChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Author Name</label>
                    <input type="text" className="form-control" name="Author" value={BookData.Author} onChange={handleOnChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="text" className="form-control" name="Price" value={BookData.Price} onChange={handleOnChange} required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Book Photo</label>
                    <input type="file" className="form-control" name="BookPhoto" onChange={handleFileChange} required />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Add Book</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div>
            {Books.map((Book) => (
              <div key={Book.
// @ts-ignore
              _id} className="mb-3">
                {Book.
// @ts-ignore
                BookPhoto ? <img src={Book.BookPhoto.url} alt="Book" width="100" /> : <p>No image available</p>}
                <p>Bookname: {Book.
// @ts-ignore
                Bookname}</p>
                <p>Author: {Book.
// @ts-ignore
                Author}</p>
                <p>Category: {Book.
// @ts-ignore
                Category}</p>
                <p>Price: {Book.
// @ts-ignore
                Price}</p>
                <button onClick={() => handleEdit(Book)} className="btn btn-warning">Edit</button>
                <button onClick={() => handleDelete(Book.
// @ts-ignore
                _id)} className="btn btn-danger ms-2">Delete</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
