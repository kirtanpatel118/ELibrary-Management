import { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    const [count, setCount] = useState(0);

    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    {/* <!-- About Us --> */}
                    <div className="col-md-4">
                        <h5>About GLS Library</h5>
                        <p className="footer-description">
                        GLS Library is your gateway to a world of knowledge. With an extensive
                        collection of books and resources, we strive to promote learning and literacy for all.
                        </p>
                    </div>

                    {/* <!-- Quick Links --> */}
                    <div className="col-md-2">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/books">Our Books</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* <!-- Contact Info --> */}
                    <div className="col-md-3">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
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
                            <li><i className="fas fa-envelope"></i>inquiry@glsuniversity.ac.in</li>
                        </ul>
                    </div>

                    {/* <!-- Social Media --> */}
                    <div className="col-md-3">
                        <h5>Follow Us</h5>
                        <div className="social-icons">
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
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 text-center">
                        <p className="mb-0">&copy; 2024 GLS Library. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
