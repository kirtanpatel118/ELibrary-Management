import React, { useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom'; // Ensure you have react-router-dom installed
import './ForgotPassword.css'; // Import the CSS file for the Forgot Password page

import toast, { Toaster } from 'react-hot-toast';

import { useNavigate, Link } from 'react-router-dom';


function ForgotPassword() {
  const [ForGotPassword, setForGotPassword] = useState({
    email: '',
    role: '',
    newPassword: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleOnChange = (e) => {
    setForGotPassword({ ...ForGotPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { newPassword, confirmPassword, email, role } = ForGotPassword;

    if (newPassword.length < 8 || confirmPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Define the endpoint based on the role
      let endpoint = '';
      if (role === 'admin') {
        endpoint = 'http://localhost:3000/admin/forgot-password';
      } else if (role === 'faculty') {
        endpoint = 'http://localhost:3000/faculty/forgot-password';
      } else if (role === 'student') {
        endpoint = 'http://localhost:3000/user/forgot-password';
      }

      // Make the API request
      const response = await axios.post(endpoint, {
        email,
        role,
        newPassword,
      });

      // Check for success
      if (response.status === 200) {
        setSuccess('Password reset successfully!');
        toast.success('Password reset successfully!')
        setError(null); // Clear any previous errors
        navigate('/login');
      } else {
        setError('Error resetting password');
        toast.error('Error resetting password');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Error resetting password');
    }
  };

  return (
    <div className="forgot-password-body">
      <div className="forgot-password-card">
        <img
          src="images/gls_logo.jpg"
          alt="Logo"
          className="forgot-password-card-logo"
        />
        <h1 className="forgot-password-card-title">Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="forgot-password-form-group">
            <label htmlFor="role" className="forgot-password-form-group-label">Role</label>
            <select
              name='role'
              value={ForGotPassword.role}
              onChange={handleOnChange}
              className='form-select login-form-control'
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="forgot-password-form-group">
            <label htmlFor="email" className="forgot-password-form-group-label">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              className="forgot-password-form-control"
              value={ForGotPassword.email}
              onChange={handleOnChange}
            />
          </div>

          <div className="forgot-password-form-group">
            <label htmlFor="newPassword" className="forgot-password-form-group-label">New Password:</label>
            <input
              type="password"
              id="newPassword"
              className="forgot-password-form-control"
              name="newPassword"
              value={ForGotPassword.newPassword}
              onChange={handleOnChange}
            />
          </div>

          <div className="forgot-password-form-group">
            <label htmlFor="confirmPassword" className="forgot-password-form-group-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="forgot-password-form-control"
              name="confirmPassword"
              value={ForGotPassword.confirmPassword}
              onChange={handleOnChange}
            />
          </div>

          {error && <div className="forgot-password-error">{error}</div>}
          {success && <div className="forgot-password-success">{success}</div>}

          <button type="submit" className="forgot-password-btn-primary">
            Reset Password
          </button>
        </form>
      {/* Add the 'Back to Login' link below the Reset Password button */}
      <div className="forgot-password-back-to-login">
          <Link to="" className="forgot-password-back-to-login-link">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;