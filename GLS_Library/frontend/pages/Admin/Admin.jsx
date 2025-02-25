import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

import Swal from 'sweetalert2';
// import 'react-quill/dist/quill.snow.css';
// import 'react-toastify/dist/ReactToastify.css';



function Admin() {
  const navigate = useNavigate();
  const [BookData, setBookData] = useState({
    Category: '',
    Bookname: '',
    Bookid: '',
    Author: '',
    BookPhoto: null,
    Price:''
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

  const [issuedBooks, setIssuedBooks] = useState([]);
  useEffect(() => {
    const fetchIssuedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/admin/issued-books',{headers: {
          'Content-Type': 'application/json', // Indicates the type of data being sent
          'Accept': 'application/json' // Indicates the type of data expected in response
        }});
        console.log(response.data); 
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
  console.log(issuedBooks);

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   setBookData({ ...BookData, [name]: value });
  // };


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
              console.log("login successfully");
            }
          } else {
            console.log("authentication failed");
          }
        })
        .catch((error) => {
          console.error(error);
          // localStorage.removeItem('JWT_Token');
        });
    }
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem('jwt_token');
  //   if (token) {
  //     axios.get('http://localhost:3000/user/get-all-books', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //       .then((response) => {
  //         if (response.data.ok) {
  //           setBooks(response.data.book);
  //           console.log(response.data.book);
  //         }
  //         else {
  //           console.log("not updateing bookdata")
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching books:", error);
  //       });
  //   }
  // }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...BookData, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   setBookData({ ...BookData, BookPhoto: e.target.files[0] });
  // };

  // const handlePdfChange = (e) => {
  //   setBookData({ ...BookData, BookPdf: e.target.files[0] });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   Object.keys(BookData).forEach((key) => {
  //     formData.append(key, BookData[key]);
  //   });
  //   console.log(BookData);
  //   const uID=admin.userID;

  //   try {
  //     const response = await axios.post(`http://localhost:3000/admin/addbook/${uID}`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });
  //     if (response.data.ok) {
  //       toast.success('add Successfully!');
  //       console.log('Response from server:', response.data);
  //     }
  //   } catch (err) {
  //     toast.error(err.response?.data?.message);
  //     console.error("something wrong");
  //   }
  // };

  const handleFileChange = (e) => {
    setBookData({ ...BookData, BookPhoto: e.target.files[0] });
  };


  const handleEdit = async (Book) => {
    // try {
    //   const response = await axios.get(`http://localhost:3000/admin/get-book/${bookId}`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`,
    //     },
    //   });
    //   if (response.data.ok) {
    //     const book = response.data.book;
    //     setBookData({
    //       Category: book.Category,
    //       Bookname: book.Bookname,
    //       Bookid: book.Bookid,
    //       Author: book.Author,
    //       BookPhoto: book.BookPhoto,
    //     });
    //   }
    // } catch (error) {
    //   toast.error(error.response?.data?.message);
    // }
    // e.preventDefault();
    navigate('/book/update', { state: { Book } });
  };

  const handleDelete = async (bookId) => {
    // try {
    //   const response = await axios.delete(`http://localhost:3000/admin/delete-book/${bookId}`, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('JWT_Token')}`,
    //     },
    //   });
    //   if (response.data.ok) {
    //     toast.success('Book deleted successfully!');
    //     setBooks(Books.filter((book) => book._id !== bookId));
    //   }
    // } catch (error) {
    //   toast.error(error.response?.data?.message);
    // }
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

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
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

  // useEffect(() => {
  //   const token = localStorage.getItem('jwt_token');
  //   if (token) {
  //     axios.get('http://localhost:3000/user/auth', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //       .then((response) => {
  //         if (response.data.ok) {
  //           const user = response.data.user;
  //           if (user) {
  //             setAdmin({
  //               firstname: user.firstname,
  //               lastname: user.lastname,
  //               email: user.email,
  //               mobileNo: user.mobileNo,
  //               course: user.course,
  //               enrollment: user.enrollment,
  //               createdAt: user.createdAt,
  //               updatedAt: user.updatedAt,
  //               userID: user._id
  //             });
  //             console.log("login successfully");
  //           }
  //         } else {
  //           console.log("authentication failed");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         // localStorage.removeItem('JWT_Token');
  //       });
  //   }
  // }, []);


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

      <div className="container mt-5" >
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
                    <label for="bookName" className="form-label">Book Name</label>
                    <input type="text" className="form-control" id="Bookname" placeholder="Enter book name" name="Bookname" value={BookData.Bookname} onChange={handleOnChange} required />
                  </div>
                  <div className="mb-3">
                    <label for="bookID" className="form-label">ISDN number</label>
                    <input type="text" className="form-control" id="BookID" placeholder="Enter book ID" name="Bookid" value={BookData.Bookid} onChange={handleOnChange} required />
                  </div>
                  <div className="mb-3">
                    <label for="authorName" className="form-label">Author Name</label>
                    <input type="text" className="form-control" id="authorName" placeholder="Enter author name" name="Author" value={BookData.Author} onChange={handleOnChange} required />
                  </div>
                  <div className="mb-3">
                    <label for="price" className="form-label">Price</label>
                    <input type="text" className="form-control" id="price" name="price" onChange={BookData.Price} required />
                  </div>
                  <div className="mb-4">
                    <label for="bookPhoto" className="form-label">Book Photo</label>
                    <input type="file" className="form-control" id="bookPhoto" name="BookPhoto" onChange={handleFileChange} required />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-add-book">Add Book</button>
                  </div>
                </form>
              </div>
            </div>
          </div>




          <div>
            {Books.map((Book) => (

              <div key={Book._id}>
                {Book.BookPhoto ? (
                  <img
                    src={Book.BookPhoto.url}
                    alt='book from backend'
                    loading="fast"
                  />
                ) : (
                  <p>No image available</p> // Fallback for books without a photo
                )}
                {/* <img
              src={Book.BookPhoto.url}
              alt='book from backend'
              loading="fast"
            /> */}
                <p>Bookname:{Book.Bookname}</p>
                <p>Author: {Book.Author}</p>
                <p>Category:{Book.Category}</p>
                <p>Price:{Book.Price}</p>
                <button onClick={() => handleEdit(Book)}>Edit</button>
                <button onClick={() => handleDelete(Book._id)}>Delete</button>
                <p>-----</p>

              </div>
            ))}
          </div>
        </div>
      </div>
            <p>------</p>
      <>
      <div style={{ padding: '20px' }}>
      <Toaster />
      {/* <h2>Issued Books</h2>
      {issuedBooks.length === 0 ? (
        <p>No books have been issued yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>User </th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Book</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Issued At</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Return By</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((issuedBook) => (
              <tr key={issuedBook._id}>
                 <td style={{ border: '1px solid #ddd', padding: '8px' }}> 
                   {issuedBook.userId.firstname} <br />   
                  {issuedBook.userId.email}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {/* {issuedBook.bookId.Bookname} <br /> 
                  {/* {issuedBook.bookid.Author} 
                  {issuedBook.bookId ? issuedBook.bookId.Bookname : 'Unknown Book'} <br /> by 
                {issuedBook.bookId ? issuedBook.bookId.Author : 'Unknown Author'}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(issuedBook.issuedAt).toLocaleString()}
                </td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {new Date(issuedBook.returnBy).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}*/}
        </div> 
      </>

    </>


  );
}

export default Admin;