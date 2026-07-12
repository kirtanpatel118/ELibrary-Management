import { useState } from 'react';
import '../src/App.css'

import { Link } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const userRole = localStorage.getItem('user_role');

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container-fluid px-4">

          {/* Logo — far LEFT, clicks to Home */}
          <Link className="navbar-brand" to='/'>
            <img src="/images/gls_logo.jpg" alt="GLS" className="logo" />
          </Link>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">

            {/* Search + Nav — pushed to RIGHT */}
            <div className="ml-auto d-flex align-items-center">

              {/* Global search bar */}
              <form className="navbar-search-form mr-3" onSubmit={handleSearch}>
                <div className="navbar-search-wrap">
                  <input
                    type="text"
                    className="navbar-search-input"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="navbar-search-btn" aria-label="Search">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>

              {/* Nav links */}
              <ul className="navbar-nav">

                <li className="nav-item">
                  <Link className="nav-link" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/books'>Our Books</Link>
                </li>

                {/* Admin-only direct links */}
                {userRole === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/admin/add-book'>Add Book</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/admin/view-books'>Manage Books</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/admin/view-issued-book'>Issue Books</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/admin/book-requests'>Book Requests</Link>
                    </li>
                  </>
                )}

                {/* Student / Faculty links */}
                {userRole === 'faculty' && (
                  <li className="nav-item">
                    <Link to='/faculty/request-book' className="nav-link">Request Book</Link>
                  </li>
                )}
                {(userRole === 'student' || userRole === 'faculty') && (
                  <li className="nav-item">
                    <Link to='/my-books' className="nav-link">My Books</Link>
                  </li>
                )}
                {(userRole === 'student' || userRole === 'faculty') && (
                  <li className="nav-item">
                    <Link to='/issued-books' className="nav-link">Issued Books</Link>
                  </li>
                )}
                {userRole !== 'admin' && (
                  <li className="nav-item">
                    <Link className="nav-link" to='/contact'>Contact Us</Link>
                  </li>
                )}

                <li className="nav-item">
                  <Link className="nav-link" to='/cart'>Cart</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/about'>About Us</Link>
                </li>

                {/* Account dropdown — icon only, no label text */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i className="fas fa-user-circle"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                    <Link className="dropdown-item" to='/profile'>Profile</Link>
                    {userRole === 'admin' && (
                      <>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to='/admin/view-users'>View Users</Link>
                        <Link className="dropdown-item" to='/admin/contact-queries'>Contact Queries</Link>
                      </>
                    )}
                    <div className="dropdown-divider"></div>
                    {isLoggedIn ? (
                      <button className="btn btn-outline-danger unique-logout-center" onClick={handleLogout}>
                        Logout
                      </button>
                    ) : (
                      <Link className="btn btn-outline-primary unique-login-center" to="/login">
                        Login
                      </Link>
                    )}
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar;
