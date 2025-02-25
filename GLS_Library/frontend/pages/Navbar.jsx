import { useState } from 'react';
import '../src/App.css'

import { BrowserRouter as Router, Link, Navigate } from "react-router-dom";
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Admin from './Admin/Admin';

function NavBar() {
  const [count, setCount] = useState(0);
  const { authUser, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();




  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_role');
    setIsLoggedIn(false);
    navigate('/login');
  };



  const token = localStorage.getItem('jwt_token');
  const userEmail = localStorage.getItem('user_email');
  const userRole = localStorage.getItem('user_role');



  return (
    <>

      {/* <!-- Navbar with Logo --> */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          {/* <!-- Navbar Brand with Logo --> */}
          <a className="navbar-brand" href="#">
            <img src="../images/gls_logo.jpg" alt="" className="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {/* <!-- Navigation Links --> */}




              <li className="nav-item dropdown"></li>
              {userRole === 'admin' && (
                <li className='nav-item'>
                  {/* <Link className='nav-link' to='/admin'>Admin</Link> */}


                  <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                    role="button" data-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i className="fas fa-user-circle"></i> Admin
                  </a>
                  <div className="dropdown-menu custom-dropdown"
                    aria-labelledby="userDropdown">
                    {/* <a class="dropdown-item" href="profile.html">Profile</a> */}
                    <Link className="dropdown-item" to='/admin/add-book'>Add Book</Link>
                    <Link className="dropdown-item" to='/admin/view-issued-book'>Issued Books</Link>
                    <Link className="dropdown-item" to='/admin/view-users'>view users</Link>
                    <Link className="dropdown-item" to='/admin/view-books'>view books</Link>
                    <Link className="dropdown-item" to='/admin/contact-queries'>contact Queries</Link>
                      <Link className="dropdown-item" to='/admin/book-requests'>Book Requests</Link>
                    {/* <a className="dropdown-item" href="settings.html">Settings</a>
                  <div className="dropdown-divider"></div> */}

                    {/* <a className="dropdown-item" href="logout.html">Logout</a>
                 */}

                    {/* {isLoggedIn ? (
                      <><button className="btn btn-outline-danger" onClick={handleLogout}>
                        Logout
                      </button>
                      </>
                    ) : (
                      <>
                        <Link className="btn btn-outline-primary" to="/login">
                          Login
                        </Link>
                      </>
                    )} */}
                  </div>

                </li>
              )}


              {/* <li>
                <Link className="nav-link" to="/forgot-password">forgot password</Link>
              </li> */}

              <li className="nav-item">
                <Link className="nav-link" to='/'>Home</Link>

              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/about'>About Us</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/books'>Our Books</Link>
              </li>
              <li className="nav-item">
                {
                  userRole !== 'admin' ?
                    <Link className="nav-link" to='/contact'>Contact us</Link>
                    : null
                }
              </li>
              <li className="nav-item">
                {userRole === 'faculty' && (
                  <Link to='/faculty/request-book' className="nav-link">Request New Book</Link>
                ) }
              </li>
              <li className="nav-item">
                <Link className="nav-link" to='/cart'>
                  {Admin.totalIssuedBooks > 0 ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag-fill" viewBox="0 0 16 16">
                      <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                    </svg>
                  }&nbsp;Cart
                </Link>
              </li>



              {/* {isLoggedIn ? (
                <><button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-primary" to="/login">
                    Login
                  </Link>
                </>
                )} */}
              {/* <li className="nav-item">
                                                <a className="nav-link" href="library.html">Library</a>
                                        </li>
                                        <li className="nav-item">
                                                <a className="nav-link" href="issue.html">Issue Book</a>
                                        </li>
                                        <li className="nav-item">
                                                <a className="nav-link" href="return.html">Return Book</a>
                                        </li>
                                        <li className="nav-item">
                                                <a className="nav-link" href="payfine.html">Pay Fine</a>
                                        </li>
                                        <li className="nav-item">
                                                <a className="nav-link" href="notifications.html">Notification</a>
                                        </li> */}
              {/* <!-- User Dropdown --> */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="userDropdown"
                  role="button" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  <i className="fas fa-user-circle"></i> User
                </a>
                <div className="dropdown-menu"
                  aria-labelledby="userDropdown">
                  {/* <a className="dropdown-item" href="profile.html">Profile</a> */}
                  <Link className="dropdown-item" to='/profile'>Profile</Link>
                  {/* <a className="dropdown-item" href="settings.html">Settings</a>
                  <div className="dropdown-divider"></div> */}

                  {/* <a className="dropdown-item" href="logout.html">Logout</a>
                 */}

                  {isLoggedIn ? (
                    <><button className="btn btn-outline-danger unique-logout-center"  onClick={handleLogout}>
                      Logout
                    </button>
                    </>
                  ) : (
                    <>
                      <Link className="btn btn-outline-primary unique-login-center" to="/login">
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav >









    </>
  )
}

export default NavBar;
