import React from 'react';
import './UserProfile.css'; // Assuming you create this CSS file for styling
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';

function User_Profile() {
  useParams(); // Corrected useParams usage
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobileNo: '',
    course: '',
    enrollment: '',
    createdAt: '',
    updatedAt: '',
    userID: ''
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
  const [current_User, setCurrent_User] = useState({
    email: '',
    role: '' // Add role to the user state
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('jwt_token');
        const userEmail = localStorage.getItem('user_email');
        const userRole = localStorage.getItem('user_role');

        if (token) {
          setCurrent_User({ email: userEmail || '', role: userRole || '' });

          const response = await axios.get('http://localhost:3000/user/auth', {
            headers: { Authorization: `Bearer ${token}` }
          });

          if (response.data.ok) {
            const userData = response.data.user;
            setUser({
              firstname: userData.firstname,
              lastname: userData.lastname,
              email: userData.email,
              mobileNo: userData.mobileNo,
              course: userData.course,
              enrollment: userData.enrollment,
              createdAt: userData.createdAt,
              updatedAt: userData.updatedAt,
              userID: userData._id
            });
          } else {
            console.log("Authentication failed");
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/profile/update', { state: { user, current_User } });
  };

  return (
    <div className="profile-container">
      <h3 className="profile-header">User Profile</h3>
      <div className="profile-card">
        <form className="profile-form">
          <p className="profile-field">
            <span className="profile-label">First Name:</span> 
            <span className="profile-value">{user.firstname}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Last Name:</span> 
            <span className="profile-value">{user.lastname}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Email:</span> 
            <span className="profile-value">{user.email}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Mobile No:</span> 
            <span className="profile-value">{user.mobileNo}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Created At:</span> 
            <span className="profile-value">{user.createdAt}</span>
          </p>
          <p className="profile-field">
            <span className="profile-label">Updated At:</span> 
            <span className="profile-value">{user.updatedAt}</span>
          </p>
          <button className="profile-button" onClick={handleClick}>
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default User_Profile;
