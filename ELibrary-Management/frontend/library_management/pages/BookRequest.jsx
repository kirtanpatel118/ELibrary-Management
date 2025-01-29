import { useState, useEffect } from 'react';
import axios from 'axios';
import {useAuth} from '../Context/AuthProvider'
// import { toast } from 'react-toastify'; // Ensure you have this for toast notifications

import toast, { Toaster } from 'react-hot-toast';

function BookRequest() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    comments: '',
  });

  const { setAuthUser , setIsLoggedIn } = useAuth();

  const [user, setUser ] = useState({
    email: '',
    role: '',
    userID: '', // Added userID to the state
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const userEmail = localStorage.getItem('user_email');
    const userRole = localStorage.getItem('user_role');
    const userID = localStorage.getItem('user_id'); // Assuming you store userID in localStorage

    if (token) {
      setUser ({
        email: userEmail,
        role: userRole,
        userID: userID,
      });

      axios.get('http://localhost:3000/user/auth', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          setAuthUser (response.data);
          setIsLoggedIn(true);
          console.log("Logged in successfully");
        })
        .catch((error) => {
          console.error(error);
          // Handle error (e.g., redirect to login)
        });
    }
  }, [setAuthUser , setIsLoggedIn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('jwt_token');
    const userEmail = user.email; // Use the userID from state
    console.log(formData);
    console.log(userEmail);
    try {
      const response = await axios.post(`http://localhost:3000/faculty/request-book/${userEmail}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json', // Change to application/json for form data
        },
      });

      if (response.data.ok) {
        toast.success('Book request submitted successfully!');
        console.log('Response from server:', response.data);
        // Reset form after submission
        setFormData({ title: '', author: '', genre: '', comments: '' });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
      console.error("Error submitting book request:", err);
    }
  };

  return (
    <>
      <h1>Request a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Book Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Request Book</button>
      </form>
    </>
  );
}

export default BookRequest;