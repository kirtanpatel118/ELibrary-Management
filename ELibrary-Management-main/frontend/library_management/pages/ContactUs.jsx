import { useState } from 'react'
import axios  from 'axios';

import toast, { Toaster } from 'react-hot-toast';

function ContactUs() {
  const [ContactInputs, setContactInputs] = useState(
    {
      name:'',
      email:'',
      message:''
    }
  );
  const handlOnChange = (e) => {
    e.preventDefault();
    setContactInputs({ ...ContactInputs, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/contact', ContactInputs);
      if (response.data.ok) {
        // setOk(true);
         toast.success('mesaage send Successfully!');
        console.log('Response from server:', response.data);
        // navigate('/login')
      }
    } catch (err) {
      toast.error("something wrong");
      console.error("something wrong=>",err);
    }
  };
  return (
    <>
      {/* <h1>ContactUs</h1> */}

      <main>
        <section class="contact-section">
          <div class="container">
            <h1>Contact Us</h1>
            <div class="row">
              {/* <!-- Contact Form --> */}
              <div class="col-lg-8 mx-auto">
                <div class="contact-form-wrapper">
                  <h2>Get in Touch</h2>
                  <p>We’re here to help you with any inquiries or issues you may have. Reach out to us using the form below:</p>
                  <form class="contact-form" onSubmit={handleOnSubmit}>
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" id="name" class="form-control" placeholder="Your Name" name="name" value={ContactInputs.name} onChange={handlOnChange} required />
                    </div>
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" id="email" class="form-control" placeholder="Your Email" name="email" value={ContactInputs.email } onChange={handlOnChange}  required />
                    </div>
                    <div class="form-group">
                      <label for="message">Message</label>
                      <textarea id="message" class="form-control" rows="5" placeholder="Your Message" name="message" value={ContactInputs.message} onChange={handlOnChange} required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

    </>
  )
}

export default ContactUs;
