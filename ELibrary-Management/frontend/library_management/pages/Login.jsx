import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

import './Login.css';
import "boxicons/css/boxicons.min.css";
import '../src/App.css';

import toast from 'react-hot-toast';
import React from 'react';

function Login() {
  const { setAuthUser, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [LoginInputs, setLoginInputs] = useState({
    role: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      axios
        .get('http://localhost:3000/user/auth', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.ok) {
            setAuthUser(response.data.user);
            setIsLoggedIn(true);
            console.log('Login successful:', response.data.user);
            navigate('/');
          } else {
            console.log('Authentication failed');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [setAuthUser, setIsLoggedIn, navigate]);

  const handleOnChange = (e) => {
    setLoginInputs({ ...LoginInputs, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (LoginInputs.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    console.log('Login Inputs:', LoginInputs); // Debugging

    try {
      let response;
      if (LoginInputs.role === 'faculty') {
        response = await axios.post('http://localhost:3000/faculty/login', LoginInputs);
      } else if (LoginInputs.role === 'admin') {
        response = await axios.post('http://localhost:3000/admin/login', LoginInputs);
      } else {
        response = await axios.post('http://localhost:3000/user/login', LoginInputs);
      }

      if (response.data.ok) {
        const token = response.data.token;
        localStorage.setItem('jwt_token', token);
        localStorage.setItem('user_role', LoginInputs.role);
        localStorage.setItem('user_email', LoginInputs.email);

        setAuthUser(LoginInputs.email);
        setIsLoggedIn(true);
        toast.success('Login Successful!');
        navigate('/', { state: { LoginInputs } });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="login-body">
      <form onSubmit={handleOnSubmit}>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="card login-card">
            <div className="login-card-body">
              <img src="images/gls_logo.jpg" alt="Logo" className="login-card-logo" />
              <h1 className="login-card-title">Login</h1>

              <div className="form-group">
                <label>Role</label>
                <select
                  name="role"
                  value={LoginInputs.role}
                  onChange={handleOnChange}
                  className="form-select login-form-control"
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>

                <label>E-mail</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text login-input-group-text">
                      <i className="bx bxs-user"></i>
                    </span>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={LoginInputs.email}
                    onChange={handleOnChange}
                    className="form-control login-form-control"
                    placeholder="Enter your e-mail"
                    required
                  />
                </div>

                <label>Password</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text login-input-group-text">
                      <i className="bx bxs-lock-alt"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={LoginInputs.password}
                    onChange={handleOnChange}
                    className="form-control login-form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/otp-verification" className="login-text-muted">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="btn login-btn-primary btn-block">
                Login
              </button>

              <div className="login-text-center mt-3">
                <p className="mb-0">
                  Don&apos;t have an account? <Link to="/register">Sign Up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
