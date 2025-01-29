import { useState } from 'react';
<<<<<<< HEAD
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    const [count, setCount] = useState(0);

    return (
        <footer className="footer">
=======
import '../src/App.css'

import { Link } from 'react-router-dom';

function Footer() {
    const [count, setCount] = useState(0)


    return (

        <footer className="footer mt-5">
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
            <div className="container">
                <div className="row">
                    {/* <!-- About Us --> */}
                    <div className="col-md-4">
<<<<<<< HEAD
                        <h5>About GLS Library</h5>
                        <p className="footer-description">
                        GLS Library is your gateway to a world of knowledge. With an extensive
                        collection of books and resources, we strive to promote learning and literacy for all.
=======
                        <h5>About LibrarySystem</h5>
                        <p className="footer-description">
                            LibrarySystem is your gateway to a world of knowledge. With an extensive
                            collection of books and resources, we strive to promote learning and
                            literacy for all.
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                        </p>
                    </div>

                    {/* <!-- Quick Links --> */}
                    <div className="col-md-2">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
<<<<<<< HEAD
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/books">Our Books</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
=======
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="books.html">Our Books</a></li>
                            <li><a href="library.html">Library</a></li>
                            <li><a href="contact.html">Contact</a></li>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                        </ul>
                    </div>

                    {/* <!-- Contact Info --> */}
                    <div className="col-md-3">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
<<<<<<< HEAD
                            <li>
                                <a href="https://maps.app.goo.gl/J5wsVDZtC5qm4Use6" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-map-marker-alt"></i>Netaji Rd, Opp.Law Garden,
                                </a>
                            </li>
                            <li>
                                <a href="https://maps.app.goo.gl/J5wsVDZtC5qm4Use6" target="_blank" rel="noopener noreferrer">
                                    <i className="fas fa-map-marker-alt"></i>Ellisbridge, Ahmedabad,
                                </a>
                            </li>
                            <li><i className="fas fa-map-marker-alt"></i>Gujarat - 380006</li>
                            <li><i className="fas fa-phone" style={{ transform: 'rotate(90deg)'}}></i>079 2644 0532</li>
=======
                            <li><Link to='https://maps.app.goo.gl/J5wsVDZtC5qm4Use6'><i className="fas fa-map-marker-alt"></i>Netaji Rd, Opp.Law Garden,</Link></li>
                            <li><Link to='https://maps.app.goo.gl/J5wsVDZtC5qm4Use6'><i className="fas fa-map-marker-alt"></i>Ellisbridge,Ahmedabad,</Link></li>
                            <li><i className="fas fa-map-marker-alt"></i>Gujarat - 380006</li>
                            <li><i className="fas fa-phone"></i>079 2644 0532</li>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                            <li><i className="fas fa-envelope"></i>inquiry@glsuniversity.ac.in</li>
                        </ul>
                    </div>

                    {/* <!-- Social Media --> */}
                    <div className="col-md-3">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
<<<<<<< HEAD
                            <a href="https://www.facebook.com/GLSuniversity?fref=photo" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://x.com/GlsUniversity" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.instagram.com/glsuniversity/?hl=en" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://www.linkedin.com/school/glsuniversity/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
=======
                            <a href="https://www.facebook.com/GLSuniversity?fref=photo" target="_blank"><i
                                className="fab fa-facebook-f"></i></a>
                            <a href="https://x.com/GlsUniversity" target="_blank"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.instagram.com/glsuniversity/?hl=en" target="_blank"><i
                                className="fab fa-instagram"></i></a>
                            <a href="https://www.linkedin.com/school/glsuniversity/posts/?feedView=all" target="_blank"><i
                                className="fab fa-linkedin-in"></i></a>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 text-center">
<<<<<<< HEAD
                        <p className="mb-0">&copy; 2024 GLS Library. All Rights Reserved.</p>
=======
                        <p className="mb-0">&copy; 2024 LibrarySystem. All Rights Reserved.</p>
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
                    </div>
                </div>
            </div>
        </footer>
    );
<<<<<<< HEAD
}

export default Footer;
=======

}

export default Footer;
>>>>>>> cb17a1bbfeafe2128bf841412e5c61f97dd9249d
