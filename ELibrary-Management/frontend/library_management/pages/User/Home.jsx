import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";
import React from "react";

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  let { params } = useParams();

  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn } = useAuth();

  const [User, setUser] = useState({
    email: "",
    role: "", // Add role to the user state
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const userEmail = localStorage.getItem("user_email");
    const userRole = localStorage.getItem("user_role");

    if (token) {
      // @ts-ignore
      setUser((prevUser) => ({
        ...prevUser,
        email: userEmail,
        role: userRole,
      }));

      axios
        .get("http://localhost:3000/user/auth", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.ok) {
            setAuthUser(response.data.user);
            setIsLoggedIn(true);
            console.log("Login successful");
          } else {
            console.log("Authentication failed");
            navigate("/login"); // Redirect to login if authentication fails
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [setAuthUser, setIsLoggedIn]);

  return (
    <>
      {/* Hero Section */}
      <header className="hero d-flex align-items-center">
        <div className="hero-content">
          <h1 className="hero-title">
            The Best Library That Every Book Lover Must Visit
          </h1>
          <p className="hero-description">
            Explore a vast collection of books and resources in a serene and inspiring environment. 
            Our library is designed to cater to all your literary needs and provide a cozy space for reading and learning.
          </p>
          <Link to="/books" className="btn btn-light btn-lg">
            Browse Books
          </Link>
        </div>
      </header>

      {/* Categories Section */}
      <section className="categories py-5">
        <div className="container">
          <h2 className="text-center mb-4">Book Categories</h2>
          <div className="row">
            {/* Category Card 1 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm border-0">
                <img
                  src="images/oxana-melis-P0FrzZVB7DE-unsplash.jpg"
                  className="card-img-top"
                  alt="Category 1"
                />
                <div className="card-body">
                  <h5 className="card-title">Computer Science</h5>
                  <p className="card-text">
                    Dive into a world of imagination and creativity with our extensive collection of fiction books.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional categories (fixed duplicates and incorrect nesting) */}
            <div className="col-md-4 mb-4">
              <div className="card shadow-sm border-0">
                <img src="images/pexels-pixabay-60582.jpg" className="card-img-top" alt="Category 2" />
                <div className="card-body">
                  <h5 className="card-title">Design</h5>
                  <p className="card-text">Explore real-life stories and insights with our diverse range of non-fiction books.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery py-5">
        <div className="container">
          <h2 className="text-center mb-4">Library Gallery</h2>
          <div className="row">
            {/* Gallery Item 1 */}
            <div className="col-md-4 mb-4">
              <div className="gallery-item">
                <img src="images/4.jpg" className="img-fluid" alt="Gallery Image 1" />
                <div className="overlay">
                  <div className="text">
                    Find Your Next Read:
                    <br />
                    <br />
                    Explore our extensive library collection, where you can find a wide range of books and resources in a comfortable setting.
                  </div>
                </div>
              </div>
            </div>

            {/* More Gallery Items */}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Others Are Saying About Our Library</h2>
          <div id="testimonialCarousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {/* Testimonial 1 */}
              <div className="carousel-item active">
                <div className="testimonial-item">
                  <div className="row">
                    <div className="col-lg-4 col-md-5">
                      <div className="testimonial-img">
                        <img src="images/aditya.png" className="img-fluid rounded-circle" alt="User 1" />
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                      <div className="testimonial-content">
                        <h4>Aditya Rajput</h4>
                        <p className="testimonial-text">
                          &quot;As a coding student, I appreciate how this library offers a wide range of tech books and a peaceful area to work on my coding skills."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* More Testimonials */}
            </div>

            {/* Carousel Controls */}
            <a className="carousel-control-prev" href="#testimonialCarousel" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#testimonialCarousel" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
