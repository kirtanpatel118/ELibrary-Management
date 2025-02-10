import { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import React from 'react';

function About() {
  // @ts-ignore
  const [count, setCount] = useState(0);

  return (
    <>  
        {/* About Us Hero Section */}
        <section className="about-hero d-flex align-items-center">
            <div className="container text-center text-white">
                <h1 className="display-4">About Our Library</h1>
                <p className="lead text-center">A place where knowledge and imagination thrive.</p>
            </div>
        </section>

        {/* Our Story Section */}
        <section className="our-story py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mb-4">Our Story</h2>
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
                    <div className="col-md-6">
                        <img src="../images/1.jpg" alt="Our Story" className="img-fluid rounded shadow-sm" />
                    </div>
                </div>
            </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="mission-vision bg-light py-5">
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-6">
                        <div className="mission p-4">
                            <h3 className="mb-3">Our Mission</h3>
                            <p>To empower individuals through knowledge and creativity by providing
                                access to a diverse range of resources and services.</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="vision p-4">
                            <h3 className="mb-3">Our Vision</h3>
                            <p>To be a leading community hub for lifelong learning, cultural
                                enrichment, and innovation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Meet the Team Section */}
        <section className="team py-5">
            <div className="container text-center">
                <h2 className="mb-5">Meet Our Team</h2>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <div className="card border-0 shadow-sm">
                            <img src="images/krupamam.jpg" className="card-img-top rounded-circle" alt="Dr. Krupa Mehta"/>
                            <div className="card-body">
                                <h5 className="card-title">Dr. Krupa Mehta</h5>
                                <p className="card-text">Project Guide</p>
                                <p className="card-text">Our guide has been crucial throughout this project, offering expert advice and support. Their leadership has inspired us to excel and solve challenges creatively.</p>
                            </div>
                        </div>
                    </div>

                    {/* Team Member 1 */}
                    <div className="col-md-4 mb-4">
                        <div className="card border-0 shadow-sm">
                            <Link to="https://www.linkedin.com/in/dhanrajsinh-dabhi/">
                                <img src="images/dhanraj.png" className="card-img-top rounded-circle" alt="Dhanrajsinh Dabhi" />
                            </Link>
                            <div className="card-body">
                                <h5 className="card-title">Dhanrajsinh Dabhi</h5>
                                <p className="card-text">BackEnd Developer</p>
                                <p className="card-text">Our backend developer specializes in
                                    server-side logic, database management, and seamless
                                    data flow, ensuring efficient performance and security.</p>
                            </div>
                        </div>
                    </div>

                    {/* Team Member 2 */}
                    <div className="col-md-4 mb-4">
                        <div className="card border-0 shadow-sm">
                            <img src="images/kirtan.png" className="card-img-top rounded-circle" alt="Kirtan Kalathiya" />
                            <div className="card-body">
                                <h5 className="card-title">Kirtan Kalathiya</h5>
                                <p className="card-text">Database Manager</p>
                                <p className="card-text">Our first database manager designs
                                    efficient database structures, ensures data integrity,
                                    and optimizes performance while maintaining strong data
                                    security.</p>
                            </div>
                        </div>
                    </div>

                    {/* Team Member 3 */}
                    <div className="col-md-4 mb-4">
                        <div className="card border-0 shadow-sm">
                            <img src="images/manish.png" className="card-img-top rounded-circle" alt="Manish Makawana" />
                            <div className="card-body">
                                <h5 className="card-title">Manish Makawana</h5>
                                <p className="card-text">Database Manager</p>
                                <p className="card-text">Our second database manager handles
                                    large-scale databases, troubleshoots issues, and ensures
                                    reliable data storage and smooth data flow.</p>
                            </div>
                        </div>
                    </div>

                    {/* Team Member 4 */}
                    <div className="col-md-4 mb-4">
                        <div className="card border-0 shadow-sm">
                            <img src="images/Meet.png" className="card-img-top rounded-circle" alt="Meet Pattani" />
                            <div className="card-body">
                                <h5 className="card-title">Meet Pattani</h5>
                                <p className="card-text">FrontEnd Developer</p>
                                <p className="card-text">Our front-end developer excels in
                                    creating visually appealing and responsive web designs,
                                    ensuring a seamless user experience.</p>
                            </div>
                        </div>
                    </div>

                    {/* Team Member 5 */}
                    <div className="col-md-4 mb-4">
                        <div className="card border-0 shadow-sm">
                            <img src="images/kishor.jpg" className="card-img-top rounded-circle" alt="Kishor Suthar" />
                            <div className="card-body">
                                <h5 className="card-title">Kishor Suthar</h5>
                                <p className="card-text">FrontEnd Developer</p>
                                <p className="card-text">Our front-end developer specializes
                                    in enhancing interfaces, optimizing performance, and
                                    implementing features for smooth user experiences.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}

export default About;
