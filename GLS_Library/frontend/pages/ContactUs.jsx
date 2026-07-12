import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function ContactUs() {
  const [ContactInputs, setContactInputs] = useState({ name: '', email: '', message: '' });

  const handlOnChange = (e) => {
    setContactInputs({ ...ContactInputs, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://elibrary-management.onrender.com/user/contact', ContactInputs);
      if (response.data.ok) {
        toast.success('Message sent successfully!');
        setContactInputs({ name: '', email: '', message: '' });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <main>
        <section className="contact-section">
          <div className="container">
            <h1>Contact Us</h1>
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <div className="contact-form-wrapper">
                  <h2>Get in Touch</h2>
                  <p>We're here to help you with any inquiries or issues you may have. Reach out to us using the form below:</p>
                  <form className="contact-form" onSubmit={handleOnSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" className="form-control" placeholder="Your Name" name="name" value={ContactInputs.name} onChange={handlOnChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" className="form-control" placeholder="Your Email" name="email" value={ContactInputs.email} onChange={handlOnChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" className="form-control" rows="5" placeholder="Your Message" name="message" value={ContactInputs.message} onChange={handlOnChange} required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default ContactUs;
