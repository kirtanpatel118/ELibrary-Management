import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookRequests.css';

function BookRequests() {
  const [bookRequests, setBookRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/admin/book-requests`);
        setBookRequests(response.data.bookRequests);
      } catch (err) {
        setError('Error fetching book requests');
        console.error(err);
      }
    };

    fetchBookRequests();
  }, []);

  return (
    <div className="bookrequests-container">
      <h1 className="bookrequests-heading">Book Requests</h1>
      {error && <div className="bookrequests-error">{error}</div>}
      <table className="bookrequests-table">
        <thead className="bookrequests-table-header">
          <tr>
            <th className="bookrequests-table-th">First Name</th>
            <th className="bookrequests-table-th">Last Name</th>
            <th className="bookrequests-table-th">Title</th>
            <th className="bookrequests-table-th">Author</th>
            <th className="bookrequests-table-th">Genre</th>
            <th className="bookrequests-table-th">Comments</th>
            <th className="bookrequests-table-th">Requested At</th>
          </tr>
        </thead>
        <tbody>
          {bookRequests.map((request) => (
            <tr key={request._id} className="bookrequests-table-row">
              <td className="bookrequests-table-data">{request.firstname}</td>
              <td className="bookrequests-table-data">{request.lastname}</td>
              <td className="bookrequests-table-data">{request.title}</td>
              <td className="bookrequests-table-data">{request.author}</td>
              <td className="bookrequests-table-data">{request.genre}</td>
              <td className="bookrequests-table-data">{request.comments}</td>
              <td className="bookrequests-table-data">
                {new Date(request.requestedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookRequests;