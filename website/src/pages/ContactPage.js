import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p>Have questions? We'd love to hear from you.</p>

        <div className="contact-content">
          <div className="contact-form-section">
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>

          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Email: info@bestfaceforward.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Main Street, City, State 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
