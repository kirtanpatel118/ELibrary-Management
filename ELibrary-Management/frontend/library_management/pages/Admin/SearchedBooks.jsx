import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Ensure you have SweetAlert2 installed

function SearchedBooks() {
  const [search, setSearch] = useState({
    BookName: '',
    Category: ''
  });

  const [books, setBooks] = useState([]); // Add a state to store the search results

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch(prevState => ({
      ...prevState,
      [name]: value // Use the name attribute to update the corresponding state
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('JWT_Token');
    console.log(search);
    if (token) {
      axios.post(`http://localhost:3000/user/search-book`, search, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.ok) {
            console.log(response.data.message);
            setBooks(response.data.books); // Update the books state with the search results
          } else {
            console.log(response.data);
            Swal.fire({
              position: "top-center",
              icon: "error",
              title: response.data.message || "No books found",
              showConfirmButton: false,
              timer: 1500
            });
          }
        })
        .catch(err => {
          console.error(err);
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "An error occurred",
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  };

  return (
    <>
      <div>
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by Book Name"
            aria-label="Search"
            name="BookName" // Specify the name attribute
            value={search.BookName} // Use the correct state property
            onChange={handleInputChange} // Call the updated handler
          />
          <br />
          <label htmlFor="category" className="form-label">Book Category</label>
          <select
            className="form-select"
            id="category"
            name="Category" // Specify the name attribute
            onChange={handleInputChange} // Call the updated handler
            required
          >
            <option value="" selected disabled>Choose category</option>
            <option value="Programming">Programming</option>
            <option value="Law">Law</option>
            <option value="Commerce">Commerce</option>
            <option value="Designing">Designing</option>
          </select>

          <button type="submit" className="btn btn-primary">Search</button>
        </form>

        {/* Display the search results */}
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                <strong>{book.BookName}</strong> - {book.Category}
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </>
  );
}

export default SearchedBooks;