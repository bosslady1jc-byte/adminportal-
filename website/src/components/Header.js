import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaLogOut } from 'react-icons/fa';
import './Header.css';

const Header = ({ user, onLogout, cartCount }) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/" className="logo">
            <div className="logo-circle">BFF</div>
            <span>Best Face Forward LLC</span>
          </Link>
        </div>

        <nav className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/contact">Contact Us</Link>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#intake">Tax Payer Intake Form</a>
          <a href="#ero">ERO Software Services</a>
          <Link to="/products">My Store</Link>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {user ? (
            <div className="user-menu">
              <span className="user-name">{user.firstName}</span>
              <button onClick={onLogout} className="logout-btn">
                <FaLogOut /> Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
