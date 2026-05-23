import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Best Face Forward LLC provides comprehensive tax preparation, intake, and ERO software solutions.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services</h3>
          <ul>
            <li><a href="#tax">Tax Preparation Training</a></li>
            <li><a href="#ero">ERO Software</a></li>
            <li><a href="#intake">Tax Payer Intake Forms</a></li>
            <li><a href="#consulting">Consulting</a></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#facebook"><FaFacebook /></a>
            <a href="#instagram"><FaInstagram /></a>
            <a href="#twitter"><FaTwitter /></a>
            <a href="#linkedin"><FaLinkedin /></a>
            <a href="#youtube"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Best Face Forward LLC. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
