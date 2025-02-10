import React from "react";
import "./App.css";
import NavBar from "../pages/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/User/Home";
import About from "../pages/User/About";
import Login from "../pages/Login";
import "./styles/App.css";

import Cart from "../pages/Cart";

import Register from "../pages/Register";
import ContactUs from "../pages/ContactUs";
import { useAuth } from "../Context/AuthProvider";
import UpdateUserProfile from "../pages/User/UpdateUserProfile";
import Footer from "../pages/Footer";

import { Navigate } from "react-router-dom";
import OurBooks from "../pages/User/OurBooks";
import User_Profile from "../pages/User/UserProfile";

import { Toaster } from "react-hot-toast";
import Admin from "../pages/Admin/Admin";

import BookUpdate from "../pages/Admin/BookUpdate";
import IssuedBooks from "../pages/Admin/IssuedBooks";
import AddBook from "../pages/Admin/AddBook";
import OTPVerification from "../pages/OTPVerification";
import SearchedBooks from "../pages/Admin/SearchedBooks";
import UserList from "../pages/Admin/ViewUsers";
import BookList from "../pages/Admin/ViewBooks";
import BookRequest from "../pages/BookRequest";
import ForgotPassword from "../pages/ForgotPassword";
import ContactQueries from "../pages/Admin/ContactQueries";
import BookRequests from "../pages/Admin/BookRequests";


// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

import PropTypes from 'prop-types';

function PublicRoute({ children }) {
  return children;
}

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

function App() {

  return (
    <>
      <div>
        <div>
          <NavBar />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <PrivateRoute>
                <ContactUs />
              </PrivateRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/otp-verification"
            element={
              <PublicRoute>
                <OTPVerification />
              </PublicRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <User_Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <PrivateRoute>
                <UpdateUserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <OurBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="/book/update"
            element={
              <PrivateRoute>
                <BookUpdate />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/view-issued-book"
            element={<IssuedBooks />}
          />
          <Route path="/admin/add-book" element={<AddBook />} />
          <Route
            path="/admin/searched-book"
            element={
              <PrivateRoute>
                <SearchedBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/view-users"
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/view-books"
            element={
              <PrivateRoute>
                <BookList />
              </PrivateRoute>
            }
          />
          <Route
            path="/faculty/request-book"
            element={
              <PrivateRoute>
                <BookRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/contact-queries"
            element={
              <PrivateRoute>
                <ContactQueries />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/book-requests"
            element={
              <PrivateRoute>
                <BookRequests />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <User_Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <PrivateRoute>
                <UpdateUserProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <OurBooks />
              </PrivateRoute>
            }
          />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={true} />
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;