/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import './our-books.css';
import React from 'react';

// eslint-disable-next-line react/prop-types
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
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

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

  const handleAddToCart = (book) => {
    // @ts-ignore
    if (issuedBooks.some(issuedBook => issuedBook._id === book._id)) {
      // @ts-ignore
      setIssuedBooks(prevItems => prevItems.filter(issuedBook => issuedBook._id !== book._id));
      setTotalIssuedBooks(prevTotal => prevTotal - 1);
    } else {
      if (totalIssuedBooks < 2) {
        // @ts-ignore
        setIssuedBooks(prevItems => [...prevItems, book]);
        setTotalIssuedBooks(prevTotal => prevTotal + 1);
      }
    }
  };

  const goToCart = () => {
    localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks));
    navigate('/cart');
  };

  const filteredBooks = Books.filter(book =>
    // @ts-ignore
    book.Bookname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // @ts-ignore
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

          <div className="row g-4">
            {filteredBooks.map((Book) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={Book._id}>
                <div className="card shadow-sm">
                  <img src={Book.BookPhoto.url} alt='book from backend' 
// @ts-ignore
                  loading="fast" className="card-img-top" />
                  <div className="card-body text-center">
                    <h5 className="card-title">{Book.Bookname}</h5>
                    <p className="card-text text-muted">Author: {Book.Author}</p>
                    <p>Price: {Book.Price}</p>
                    <button
                      onClick={() => handleAddToCart(Book)}
                      // @ts-ignore
                      disabled={totalIssuedBooks >= 2 && !issuedBooks.some(issuedBook => issuedBook._id === Book._id)}
                      // @ts-ignore
                      className={`btn btn-sm ${issuedBooks.some(issuedBook => issuedBook._id === Book._id) ? 'btn-danger' : 'btn-primary'}`}
                    >
                      {issuedBooks.some(issuedBook => issuedBook.
// @ts-ignore
                      _id === Book._id) ? 'Remove Book' : totalIssuedBooks >= 2 ? 'Limit Reached for All Books' : 'Issue Book'}
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
