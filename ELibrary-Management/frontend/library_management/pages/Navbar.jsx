import { useState } from 'react';
import '../src/App.css';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function NavBar() {
  const { authUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');

    setIsLoggedIn(false);
    navigate('/login');
  };

  const userRole = localStorage.getItem('user_role');

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          {/* Brand with Logo */}
          <a className="navbar-brand" href="/">
            <img src="images/gls_logo.jpg" alt="LibrarySystem Logo" className="logo" />
            LibrarySystem
          </a>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">

              {/* Admin Dropdown */}
              {userRole === 'admin' && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-toggle="dropdown">
                    <i className="fas fa-user-circle"></i> Admin
                  </a>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link className="dropdown-item" to='/admin/add-book'>Add Book</Link>
                    <Link className="dropdown-item" to='/admin/view-issued-book'>Issued Books</Link>
                    <Link className="dropdown-item" to='/admin/view-users'>View Users</Link>
                    <Link className="dropdown-item" to='/admin/view-books'>View Books</Link>
                    <Link className="dropdown-item" to='/admin/contact-queries'>Contact Queries</Link>
                    <Link className="dropdown-item" to='/admin/book-requests'>Book Requests</Link>
                  </div>
                </li>
              )}

              {/* Main Navigation Links */}
              <li className="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to='/about'>About Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to='/books'>Our Books</Link></li>

              {userRole !== 'admin' && (
                <li className="nav-item"><Link className="nav-link" to='/contact'>Contact Us</Link></li>
              )}

              {userRole === 'faculty' && (
                <li className="nav-item"><Link className="nav-link" to='/faculty/request-book'>Request New Book</Link></li>
              )}

              {/* Cart */}
              <li className="nav-item">
                <Link className="nav-link" to='/cart'>
                  <i className="bi bi-bag"></i> Cart
                </Link>
              </li>

              {/* User Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown">
                  <i className="fas fa-user-circle"></i> User
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <Link className="dropdown-item" to='/profile'>Profile</Link>

                  {isLoggedIn ? (
                    <button className="dropdown-item btn btn-outline-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  ) : (
                    <Link className="dropdown-item btn btn-outline-primary" to="/login">
                      Login
                    </Link>
                  )}
                </div>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
