import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './our-books.css';

const Cart = ({ items }) => {
  return (
    <div className="container my-5">
      <h2 className="mb-3 text-center">Issued Books ({items.length})</h2>
      {items.length === 0 ? (
        <p className="text-center text-muted">No books issued</p>
      ) : (
        <ul className="list-group">
          {items.map((item, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{item.Bookname} by {item.Author}</span>
              <span className="badge bg-primary rounded-pill">Ready for issuing</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function OurBooks() {
  const [Books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0); // Track total issued books
  const [searchQuery, setSearchQuery] = useState(""); // State for search

  const navigate = useNavigate();

  const goToCart = () => {
    localStorage.removeItem('issuedBooks');
    localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks));
    navigate('/cart');
  };




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

  // const handleAddToCart = (book) => {
  //   // Check if the book is already issued
  //   if (!issuedBooks.some(issuedBook => issuedBook._id === book._id)) {
  //     if (totalIssuedBooks < 2) { // Check total issued limit
  //       setIssuedBooks((prevItems) => [...prevItems, book]);
  //       setTotalIssuedBooks((prevTotal) => prevTotal + 1); // Increment total issued books
  //     }
  //   }
  // };

  const handleAddToCart = (book) => {
    // Check if the book is already issued
    if (issuedBooks.some(issuedBook => issuedBook._id === book._id)) {
      // Remove the book from issuedBooks
      setIssuedBooks(prevItems => prevItems.filter(issuedBook => issuedBook._id !== book._id));
      setTotalIssuedBooks(prevTotal => prevTotal - 1); // Decrement total issued books
    } else {
      // Add the book to issuedBooks if the limit is not reached
      if (totalIssuedBooks < 2) {
        setIssuedBooks(prevItems => [...prevItems, book]);
        setTotalIssuedBooks(prevTotal => prevTotal + 1); // Increment total issued books
      }
    }
  };


  const filteredBooks = Books.filter(book =>
    book.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.Author.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
      <section className="hero-section text-center py-4 text-light bg-dark" style={{ marginTop: "100px" }}>
        <div className="container">
          <h1 className="display-4">Explore Our Collection</h1>
          <p className="lead">Find your next great read from our extensive library.</p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="books-grid py-5">
        <div className="container">
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search for books by title or author"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <div className="row g-4">
            {Books.map((Book) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={Book._id}>
                <div className="card shadow-sm">
                  <img src={Book.BookPhoto.url} alt='book from backend' loading="fast" className="card-img-top" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{Book.Bookname}</h5>
                    <p className="card-text text-muted">Author: {Book.Author}</p>
                    <p >price:{Book.Price}</p>
                    {/* <button
                      onClick={() => handleAddToCart(Book)}
                      disabled={totalIssuedBooks >= 2 || issuedBooks.some(issuedBook => issuedBook._id === Book._id)} // Disable if total issued is 2 or book is already issued
                      className="btn btn-primary btn-sm"
                    >
                      {totalIssuedBooks >= 2 ? 'Limit Reached for All Books' : issuedBooks.some(issuedBook => issuedBook._id === Book._id) ? 'Already Issued' : 'Issue Book'}
                    </button> *
                    <button
                      onClick={() => handleAddToCart(Book)}
                      disabled={totalIssuedBooks >= 2 && !issuedBooks.some(issuedBook => issuedBook._id === Book._id)} // Disable if total issued is 2 and book is not already issued
                      // className="btn btn-primary btn-sm"
                      className={`btn btn-sm ${issuedBooks.some(issuedBook => issuedBook._id === Book._id) ? 'btn-danger' : 'btn-primary'}`} // Change class based on issued state
                    >
                      {issuedBooks.some(issuedBook => issuedBook._id === Book._id) ? 'Remove Book' : totalIssuedBooks >= 2 ? 'Limit Reached for All Books' : 'Issue Book'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div> */}


          <div className="row g-4">
            {filteredBooks.map((Book) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={Book._id}>
                <div className="card shadow-sm">
                  <img src={Book.BookPhoto.url} alt='book from backend' loading="fast" className="card-img-top" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{Book.Bookname}</h5>
                    <p className="card-text text-muted">Author: {Book.Author}</p>
                    <p>Price: {Book.Price}</p>
                    <button
                      onClick={() => handleAddToCart(Book)}
                      disabled={totalIssuedBooks >= 2 && !issuedBooks.some(issuedBook => issuedBook._id === Book._id)} // Disable if total issued is 2 and book is not already issued
                      className={`btn btn-sm ${issuedBooks.some(issuedBook => issuedBook._id === Book._id) ? 'btn-danger' : 'btn-primary'}`} // Change class based on issued state
                    >
                      {issuedBooks.some(issuedBook => issuedBook._id === Book._id) ? 'Remove Book' : totalIssuedBooks >= 2 ? 'Limit Reached for All Books' : 'Issue Book'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Cart items={issuedBooks} />
      <div className="text-center my-4">
        <button
          onClick={goToCart}
          disabled={totalIssuedBooks === 0}
          className="btn btn-primary"
        >
          Go to Cart
        </button>
      </div>
    </>
  );
}

export default OurBooks;