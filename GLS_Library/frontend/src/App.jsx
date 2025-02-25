import { useState } from 'react'
import NavBar from '../pages/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/User/Home'
import About from '../pages/User/About'
import UserProfile from '../pages/User/UserProfile'
import Login from '../pages/Login'
import Cart from '../pages/Cart';
import Register from '../pages/Register'
import ContactUs from '../pages/ContactUs'
import { useAuth } from '../Context/AuthProvider'
import UpdateUserProfile from '../pages/User/UpdateUserProfile'
import Footer from '../pages/Footer';

import { useNavigate, Link, Navigate } from 'react-router-dom';
import OurBooks from '../pages/User/OurBooks'
import User_Profile from '../pages/User/UserProfile'

import toast, { Toaster } from 'react-hot-toast';
import Admin from '../pages/Admin/Admin'
import BookUpdate from '../pages/Admin/BookUpdate'
import IssuedBooks from '../pages/Admin/IssuedBooks'
import AddBook from '../pages/Admin/AddBook'
import OTPVerification from '../pages/OTPVerification'
import SearchedBooks from '../pages/Admin/SearchedBooks'
import UserList from '../pages/Admin/ViewUsers'
import BookList from '../pages/Admin/ViewBooks'
import BookRequest from '../pages/BookRequest'
import ForgotPassword from '../pages/ForgotPassword'
import ContactQueries from '../pages/Admin/ContactQueries'
import BookRequests from '../pages/Admin/BookRequests'


function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;

};

function PublicRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to="/" replace /> : children;
}


function App() {
  const navigate = useNavigate();

  return (
    <>
      <div >

        <div>
          <NavBar />
        </div>
        <Routes>
          <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route exact path='/about' element={<PrivateRoute><About /></PrivateRoute>} />
          <Route exact path='/contact' element={<PrivateRoute><ContactUs /></PrivateRoute>} />
          <Route exact path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route exact path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route exact path='/otp-verification' element={<PublicRoute><OTPVerification /></PublicRoute>} />
          <Route exact path='/forgot-password' element={<ForgotPassword />}/>
          

          <Route exact path='/cart' element={<PrivateRoute><Cart /> </PrivateRoute>} />
          <Route exact path='/profile' element={<PrivateRoute><User_Profile /></PrivateRoute>} />
          <Route exact path='/profile/update' element={<PrivateRoute><UpdateUserProfile /></PrivateRoute>} />
          <Route exact path='/books' element={<PrivateRoute><OurBooks /></PrivateRoute>} />
          <Route exact path='/book/update' element={<PrivateRoute><BookUpdate /></PrivateRoute>} />
          
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/admin/view-issued-book' element={<IssuedBooks />} />
          <Route exact path='/admin/add-book' element={<AddBook />} />
          <Route exact path='/admin/searched-book' element={<PrivateRoute><SearchedBooks /></PrivateRoute>} />
          <Route exact path='/admin/view-users' element={<PrivateRoute><UserList /></PrivateRoute>} />
          <Route exact path='/admin/view-books' element={<PrivateRoute><BookList /></PrivateRoute>} />
          <Route exact path='/faculty/request-book' element={<PrivateRoute><BookRequest /></PrivateRoute>} />
          <Route exact path='/admin/contact-queries' element={<PrivateRoute><ContactQueries /></PrivateRoute>} />
          <Route exact path='/admin/book-requests' element={<PrivateRoute><BookRequests /></PrivateRoute>}/>




        </Routes>
        <Toaster
          position="top-center"
          reverseOrder={true}
        />
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default App;
