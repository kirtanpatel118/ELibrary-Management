import { useState,useEffect } from 'react'
import axios from 'axios';
import { useLocation,useNavigate,useParams, Link } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';


function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  let { params } = useParams();

  const { authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn } = useAuth();
    
   
  //   const [user, setUser] = useState(
  //     location.state ||
  //     {
  //       role: '',  
  //       email: '',
  //       password: ''
  //     }
  //   );

  //   useEffect(() => {
  //     if (location.state.LoginInputs) {
  //         setUser(location.state.LoginInputs);
  //     }
  // }, [location.state.LoginInputs]);


    
  // const [user, setUser ] = useState(
  //   // location.state?.LoginInputs || { role: '', email: '',password:'' }
  //   location.state?.LoginInputs 
  // ); 

  // useEffect(() => {
  //   if (location.state?.LoginInputs) {
  //     setUser (location.state.LoginInputs);
  //   }
  // }, [location.state]);
  // console.log(user);




  // const [User, setUser ] = useState({
  //   email: '',
  //   role: '' // Add role to the user state
  // });

  // const token = localStorage.getItem('jwt_token');
  // const userEmail = localStorage.getItem('user_email');
  // const userRole = localStorage.getItem('user_role');

  // if (token) {
  //   // Set the user state with the retrieved email and role
  //   setUser (prevUser  => ({
  //     ...prevUser ,
  //     email: userEmail,
  //     role: userRole
  //   }));



  const [User, setUser ] = useState({
    email: '',
    role: '' // Add role to the user state
  });

  


  useEffect(() => {

    const token = localStorage.getItem('jwt_token');
    const userEmail = localStorage.getItem('user_email');
    const userRole = localStorage.getItem('user_role');
  
    if (token) {
      // Set the user state with the retrieved email and role
      setUser (prevUser  => ({
        ...prevUser ,
        email: userEmail,
        role: userRole
      }));



        const token = localStorage.getItem('jwt_token');
        if (token) {
            axios.get('http://localhost:3000/user/auth', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => {
                  if (response.data.ok) {
                    setAuthUser (response.data.user);
                    setIsLoggedIn(true);
                    console.log("login successfully");
                } else {
                    console.log("authentication failed");
                    navigate('/login'); // Redirect to login if authentication fails
                }
                
                    // setAuthUser(response.data);
                    // setIsLoggedIn(true);
                    // console.log("login successfully");
                })
                .catch((error) => {
                    console.error(error);
                    // navigate()
                    
                    // localStorage.removeItem('JWT_Token');
                });
        }

      }
    },  [setAuthUser , setIsLoggedIn]);
  

  return (
    <>
      {/* <h1>home</h1> */}

      {/* <!-- Hero Section --> */}
      <header class="hero d-flex align-items-center">
        <div class="hero-content">
          <h1 class="hero-title">The Best Library That Every Book Lover Must Visit</h1>
          <p class="hero-description">Explore a vast collection of books and resources in a serene and
            inspiring environment. Our library is designed to meet to all your
            reading and learning needs, provide a comfortable space for you to
            enjoy and study.</p>
            <Link to="/books" className="btn btn-light btn-lg">
            Browse Books
          </Link>
        </div>
      </header>



      {/* <!-- Categories Section --> */}
      <section class="categories py-5">
        <div class="container">
          <h2 class="text-center mb-4">Book Categories</h2>
          <div class="row">
            {/* <!-- Category Card 1 --> */}
            <div class="col-md-4 mb-4">
              <div class="card shadow-sm border-0">
                <img src="images/oxana-melis-P0FrzZVB7DE-unsplash.jpg"
                  class="card-img-top" alt="Category 1" />
                <div class="card-body">
                  <h5 class="card-title">Computer Science</h5>
                  <p class="card-text">Dive into a world of imagination and
                    creativity with our extensive collection of fiction
                    books.</p>
                </div>
              </div>
            </div>
            {/* <!-- Category Card 2 --> */}
            <div class="col-md-4 mb-4">
              <div class="card shadow-sm border-0">
                <img src="images/pexels-pixabay-60582.jpg" class="card-img-top"
                  alt="Category 2" />
                <div class="card-body">
                  <h5 class="card-title">Design</h5>
                  <p class="card-text">Explore real-life stories and insights with
                    our diverse range of non-fiction books.</p>
                </div>
              </div>
            </div>
            {/* <!-- Category Card 3 --> */}
            <div class="col-md-4 mb-4">
              <div class="card shadow-sm border-0">
                <img src="images/pexels-pixabay-415071.jpg" class="card-img-top"
                  alt="Category 3" />
                <div class="card-body">
                  <h5 class="card-title">Management</h5>
                  <p class="card-text">Enhance your knowledge with our collection
                    of science books covering various fields and topics.</p>
                </div>
              </div>
            </div>
            {/* <!-- Category Card 4 --> */}
            <div class="col-md-4 mb-4">
              <div class="card shadow-sm border-0">
                <img src="images/pexels-pixabay-60582.jpg" class="card-img-top"
                  alt="Category 4" />
                <div class="card-body">
                  <h5 class="card-title">Law</h5>
                  <p class="card-text">Uncover the past with our extensive range
                    of history books that delve into different eras and
                    events.</p>
                </div>
              </div>
            </div>
            {/* <!-- Category Card 5 --> */}
            <div class="col-md-4 mb-4">
              <div class="card shadow-sm border-0">
                <img src="images/pexels-pixabay-415071.jpg" class="card-img-top"
                  alt="Category 5" />
                <div class="card-body">
                  <h5 class="card-title">Commerce</h5>
                  <p class="card-text">Learn about the lives of inspiring
                    individuals through our collection of biography books.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Category Card 6 --> */}
            <div class="col-md-4 mb-4">
              <div class="card shadow-sm border-0">
                <img src="images/pexels-pixabay-60582.jpg" class="card-img-top"
                  alt="Category 6" />
                <div class="card-body">
                  <h5 class="card-title">Travel</h5>
                  <p class="card-text">Discover new places and cultures with our
                    selection of travel books.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Gallery Section --> */}
      <section class="gallery py-5">
        <div class="container">
          <h2 class="text-center mb-4">Library Gallery</h2>
          <div class="row">
            {/* <!-- Gallery Item 1 --> */}
            <div class="col-md-4 mb-4">
              <div class="gallery-item">
                <img src="images/4.jpg" class="img-fluid" alt="Gallery Image 1" />
                <div class="overlay" >
                  <div class="text">Find Your Next Read: <br/><br/>Explore our
                                                                extensive library collection, where you can find a wide
                                                                range of books and resources in a comfortable setting.</div>
                </div>
              </div>
            </div>
            {/* <!-- Gallery Item 2 --> */}
            <div class="col-md-4 mb-4">
              <div class="gallery-item">
                <img src="images/2.jpg" class="img-fluid" alt="Gallery Image 2" />
                <div class="overlay" >
                  <div class="text">Explore Our Library: <br/><br/>Browse through a
                                                                vast collection of books and resources tailored to your
                                                                interests, all in a welcoming environment.</div>
                </div>
              </div>
            </div>
            {/* <!-- Gallery Item 3 --> */}
            <div class="col-md-4 mb-4">
              <div class="gallery-item">
                <img src="images/3.jpg" class="img-fluid" alt="Gallery Image 3" />
                <div class="overlay" >
                  <div className="text">Your Reading Haven: <br/><br/>Discover a diverse
                                                                selection of books and enjoy a cozy space designed to
                                                                enhance your reading and learning experience.</div>
                </div>
              </div>
            </div>
            {/* <!-- Add more gallery items as needed --> */}

          </div>
        </div>
      </section>




      {/* <!-- What Others Are Saying Section --> */}
        <section class="testimonials py-5">
                <div class="container">
                        <h2 class="text-center mb-5">What Others Are Saying About Our Library</h2>
                        <div id="testimonialCarousel" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                        {/* <!-- Testimonial 1 --> */}
                                        <div class="carousel-item active">
                                                <div class="testimonial-item">
                                                        <div class="row">
                                                                <div class="col-lg-4 col-md-5">
                                                                        <div class="testimonial-img">
                                                                                <img src="images/aditya.png"
                                                                                        class="img-fluid rounded-circle"
                                                                                        alt="User 1" />
                                                                        </div>
                                                                </div>
                                                                <div class="col-lg-8 col-md-7">
                                                                        <div class="testimonial-content">
                                                                                <h4>Aditya Rajput</h4>
                                                                                <p class="testimonial-text">"As a coding
                                                                                        student, I appreciate how this
                                                                                        library offers a wide range of
                                                                                        tech books and a peaceful area
                                                                                        to work on my coding skills."</p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        {/* <!-- Testimonial 2 --> */}
                                        <div class="carousel-item">
                                                <div class="testimonial-item">
                                                        <div class="row">
                                                                <div class="col-lg-4 col-md-5">
                                                                        <div class="testimonial-img">
                                                                                <img src="images/user2.jpg"
                                                                                        class="img-fluid rounded-circle"
                                                                                        alt="User 2" />
                                                                        </div>
                                                                </div>
                                                                <div class="col-lg-8 col-md-7">
                                                                        <div class="testimonial-content">
                                                                                <h4>Emily</h4>
                                                                                <p class="testimonial-text">"I love the
                                                                                        variety of books available
                                                                                        here. The quiet environment and
                                                                                        comfortable seating make it the
                                                                                        perfect spot for long reading
                                                                                        sessions."
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        {/* <!-- Testimonial 3 --> */}
                                        <div class="carousel-item">
                                                <div class="testimonial-item">
                                                        <div class="row">
                                                                <div class="col-lg-4 col-md-5">
                                                                        <div class="testimonial-img">
                                                                                <img src="images/jevin.png"
                                                                                        class="img-fluid rounded-circle"
                                                                                        alt="User 3" />
                                                                        </div>
                                                                </div>
                                                                <div class="col-lg-8 col-md-7">
                                                                        <div class="testimonial-content">
                                                                                <h4>Jevin Kotak</h4>
                                                                                <p class="testimonial-text">"A wonderful
                                                                                        place to explore books and enjoy
                                                                                        some quiet time. It’s easy to
                                                                                        find what you’re looking for,
                                                                                        and the environment is
                                                                                        relaxing."</p>
                                                                        </div>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                {/* <!-- Carousel Controls --> */}
                                <a class="carousel-control-prev" href="#testimonialCarousel" role="button"
                                        data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#testimonialCarousel" role="button"
                                        data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                </a>
                        </div>
                </div>
        </section>


    </>
  )
}

export default Home;
