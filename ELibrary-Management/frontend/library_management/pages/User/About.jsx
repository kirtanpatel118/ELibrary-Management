import { useState } from 'react'
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import './About.css';
=======
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d


function About() {
  const [count, setCount] = useState(0)

  return (
    <>  
        {/* <h1>About</h1> */}
        {/* <!-- About Us Hero Section --> */}
        <section class="about-hero d-flex align-items-center">
                <div class="container text-center text-white">
                        <h1 class="display-4">About Our Library</h1>
                        <p class="lead text-center">A place where knowledge and imagination thrive.</p>
                </div>
        </section>

        {/* <!-- Our Story Section --> */}
<<<<<<< HEAD
        <section class="our-story">
=======
        <section class="our-story py-5">
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                <div class="container">
                        <div class="row">
                                <div class="col-md-6">
                                        <h2 class="mb-4">Our Story</h2>
                                        <p>Founded in [2015], our library has grown from a small collection of books to
                                                a vast repository of knowledge and resources. We are committed to
                                                providing a space where people can come together to learn, discover, and
                                                be inspired. Our mission is to foster a love for reading and learning in
                                                a welcoming and inclusive environment.</p>
                                        <p>With state-of-the-art facilities and a dedicated team, we offer a wide range
                                                of services to meet the needs of our diverse community. Whether you're a
                                                student, a professional, or simply a book lover, our library is here to
                                                support your journey.</p>
                                </div>
                                <div class="col-md-6">
                                        <img src="../images/1.jpg" alt="Our Story" class="img-fluid rounded shadow-sm" />
                                </div>
                        </div>
                </div>
        </section>

        {/* <!-- Mission & Vision Section --> */}
        <section class="mission-vision bg-light py-5">
                <div class="container text-center">
                        <div class="row">
                                <div class="col-md-6">
                                        <div class="mission p-4">
                                                <h3 class="mb-3">Our Mission</h3>
                                                <p>To empower individuals through knowledge and creativity by providing
                                                        access to a diverse range of resources and services.</p>
                                        </div>
                                </div>
                                <div class="col-md-6">
                                        <div class="vision p-4">
                                                <h3 class="mb-3">Our Vision</h3>
                                                <p>To be a leading community hub for lifelong learning, cultural
                                                        enrichment, and innovation.</p>
                                        </div>
                                </div>
                        </div>
                </div>
        </section>

        {/* <!-- Meet the Team Section --> */}
        <section class="team py-5">
                <div class="container text-center">
                        <h2 class="mb-5">Meet Our Team</h2>
                        <div class="row">
                        <div class="col-md-4 mb-4">
                                        <div class="card border-0 shadow-sm">
                                                <img src="images/krupamam.jpg" class="card-img-top rounded-circle"
                                                        alt="Team Member 3"/>
                                                <div class="card-body">
                                                        <h5 class="card-title">Dr. Krupa Mehta</h5>
                                                        <p class="card-text">Project guide</p>
                                                        <p class="card-text">Our guide has been crucial throughout this project, offering expert advice and support. Their leadership has inspired us to excel and solve challenges creatively.</p>
                                                </div>
                                        </div>
                                </div>
                                {/* <!-- Team Member 1 --> */}
                                <div class="col-md-4 mb-4">
                                        <div class="card border-0 shadow-sm">
                                               <Link to="https://www.linkedin.com/in/dhanrajsinh-dabhi/" > <img src="images/dhanraj.png" class="card-img-top rounded-circle"
                                                        alt="Team Member 1" /></Link>
                                                <div class="card-body">
                                                        <h5 class="card-title">Dhanrajsinh Dabhi</h5>
                                                        <p class="card-text">BackEnd Developer</p>
<<<<<<< HEAD
                                                        <p class="card-text">Our backend developer specializes in
                                                                server-side logic, database management, and seamless
                                                                data flow, ensuring efficient performance and security.
=======
                                                        <p class="card-text">dhanrajsinh is passionate about books and has over
                                                                20 years of experience in library management. He leads
                                                                our team with dedication and a commitment to excellence.
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                                                        </p>
                                                </div>
                                                
                                        </div>
                                </div>
                                {/* <!-- Team Member 2 --> */}
                                <div class="col-md-4 mb-4">
                                        <div class="card border-0 shadow-sm">
                                                <img src="images/kirtan.png" class="card-img-top rounded-circle"
                                                        alt="Team Member 2" />
                                                <div class="card-body">
                                                        <h5 class="card-title">Kirtan Kalathiya</h5>
                                                        <p class="card-text">Database Manager</p>
<<<<<<< HEAD
                                                        <p class="card-text">Our first database manager designs
                                                                efficient database structures, ensures data integrity,
                                                                and optimizes performance while maintaining strong data
                                                                security.</p>
=======
                                                        <p class="card-text">Jane is an expert in research and reference
                                                                services. She assists visitors in finding the
                                                                information they need with a smile.</p>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                                                </div>
                                        </div>
                                </div>
                                {/* <!-- Team Member 3 --> */}
                                <div class="col-md-4 mb-4">
                                        <div class="card border-0 shadow-sm">
                                                <img src="images/manish.png" class="card-img-top rounded-circle"
                                                        alt="Team Member 3" />
                                                <div class="card-body">
                                                        <h5 class="card-title">Manish Makawana</h5>
                                                        <p class="card-text">Database Manager</p>
<<<<<<< HEAD
                                                        <p class="card-text">Our second database manager handles
                                                                large-scale databases, troubleshoots issues, and ensures
                                                                reliable data storage and smooth data flow.</p>
=======
                                                        <p class="card-text">Emily manages our digital collection,
                                                                ensuring that our online resources are accessible and
                                                                up-to-date.</p>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                                                </div>
                                        </div>
                                </div>
                                <div class="col-md-4 mb-4">
                                        <div class="card border-0 shadow-sm">
                                                <img src="images/Meet.png" class="card-img-top rounded-circle"
                                                        alt="Team Member 3" />
                                                <div class="card-body">
                                                        <h5 class="card-title">Meet Pattani</h5>
                                                        <p class="card-text">FrontEnd Developer</p>
<<<<<<< HEAD
                                                        <p class="card-text">Our front-end developer excels in
                                                                creating visually appealing and responsive web designs,
                                                                ensuring a seamless user experience with clean and
                                                                efficient code.</p>
=======
                                                        <p class="card-text">Emily manages our digital collection,
                                                                ensuring that our online resources are accessible and
                                                                up-to-date.</p>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                                                </div>
                                        </div>
                                </div>
                                <div class="col-md-4 mb-4">
                                        <div class="card border-0 shadow-sm">
                                                <img src="images/kishor.jpg" class="card-img-top rounded-circle"
                                                        alt="Team Member 3"/>
                                                <div class="card-body">
                                                        <h5 class="card-title">Kishor Suthar</h5>
                                                        <p class="card-text">FrontEnd Developer</p>
<<<<<<< HEAD
                                                        <p class="card-text">Our front-end developer specializes
                                                                in enhancing interfaces, optimizing performance, and
                                                                implementing features for smooth and engaging user
                                                                experience.</p>
=======
                                                        <p class="card-text">Emily manages our digital collection,
                                                                ensuring that our online resources are accessible and
                                                                up-to-date.</p>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                                                </div>
                                        </div>
                                </div>
                        </div>
                </div>
        </section>

        {/* <!-- Library Features Section --> */}
        <section class="library-features py-5 bg-light">
                <div class="container">
                        <h2 class="text-center mb-5">What Makes Us Special</h2>
                        <div class="row">
                                {/* <!-- Feature 1 --> */}
                                <div class="col-md-4 mb-4 text-center">
                                        <i class="fas fa-book-reader fa-3x text-primary mb-3"></i>
                                        <h4 class="mb-3">Extensive Collection</h4>
                                        <p>We offer a vast collection of books, eBooks, journals, and more across
                                                various genres and subjects.</p>
                                </div>
                                {/* <!-- Feature 2 --> */}
                                <div class="col-md-4 mb-4 text-center">
                                        <i class="fas fa-laptop fa-3x text-primary mb-3"></i>
                                        <h4 class="mb-3">Digital Resources</h4>
                                        <p>Our digital library provides access to thousands of online resources,
                                                including databases, audiobooks, and eMagazines.</p>
                                </div>
                                {/* <!-- Feature 3 --> */}
                                <div class="col-md-4 mb-4 text-center">
                                        <i class="fas fa-user-friends fa-3x text-primary mb-3"></i>
                                        <h4 class="mb-3">Community Events</h4>
                                        <p>Join our regular community events, workshops, and reading programs designed
                                                for all ages.</p>
                                </div>
                        </div>
                </div>
        </section>
    </>
  )
}

export default About;
