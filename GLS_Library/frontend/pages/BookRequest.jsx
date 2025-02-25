import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';
import './FBookRequest.css';

function BookRequest() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    comments: '',
  });

  const { setAuthUser, setIsLoggedIn } = useAuth();

  const [user, setUser] = useState({
    email: '',
    role: '',
    userID: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const userEmail = localStorage.getItem('user_email');
    const userRole = localStorage.getItem('user_role');
    const userID = localStorage.getItem('user_id');

    if (token) {
      setUser({
        email: userEmail,
        role: userRole,
        userID: userID,
      });

      axios
        .get('http://localhost:3000/user/auth', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setAuthUser(response.data);
          setIsLoggedIn(true);
          console.log('Logged in successfully');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [setAuthUser, setIsLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt_token');
    const userEmail = user.email;
    console.log(formData);
    console.log(userEmail);
    try {
      const response = await axios.post(
        `http://localhost:3000/faculty/request-book/${userEmail}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.ok) {
        toast.success('Book request submitted successfully!');
        console.log('Response from server:', response.data);
        setFormData({ title: '', author: '', genre: '', comments: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
      console.error('Error submitting book request:', err);
    }
  };

  return (
    <>
      <Toaster />
      <div className="book-request-wrapper">
        <h1 className="book-request-title">Request a New Book</h1>
        <form onSubmit={handleSubmit} className="book-request-form-wrapper">
          <div className="form-group-title">
            <label className="form-label-title">Book Title:</label>
            <input
              type="text"
              name="title"
              className="form-input-title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-author">
            <label className="form-label-author">Author:</label>
            <input
              type="text"
              name="author"
              className="form-input-author"
              value={formData.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-genre">
            <label className="form-label-genre">Genre:</label>
            <input
              type="text"
              name="genre"
              className="form-input-genre"
              value={formData.genre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group-comments">
            <label className="form-label-comments">Comments:</label>
            <textarea
              name="comments"
              className="form-textarea-comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="form-button-submit">
            Request Book
          </button>
        </form>
      </div>
    </>
  );
}

export default BookRequest;
