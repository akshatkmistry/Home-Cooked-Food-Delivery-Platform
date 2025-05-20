import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Foodela</h3>
          <p className="footer-text">
            Delivering culinary excellence to your doorstep with passion and precision since 2015.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="footer-section">
          <h4 className="footer-subheading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/menu" className="footer-link">Our Menu</Link></li>
            <li><Link to="/about" className="footer-link">Our Story</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            <li><Link to="/faq" className="footer-link">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-subheading">Contact Us</h4>
          <ul className="footer-links">
            <li><a href="mailto:hello@foodela.com" className="footer-link">hello@foodela.com</a></li>
            <li><a href="tel:+11234567890" className="footer-link">+1 (123) 456-7890</a></li>
            <li className="footer-text" style={{ marginTop: '1rem' }}>
              123 Gourmet Street, Foodville
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div className="footer-section">
          <h4 className="footer-subheading">Join Our Community</h4>
          <div className="footer-social-icons">
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Foodela. All rights reserved. | <Link to="/privacy" className="footer-link">Privacy Policy</Link> | <Link to="/terms" className="footer-link">Terms of Service</Link></p>
      </div>
    </footer>
  );
}