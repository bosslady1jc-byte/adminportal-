import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Best Face Forward LLC</h1>
          <p>Professional Tax Preparation & ERO Software Solutions</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">Shop Now</Link>
            <Link to="/contact" className="btn btn-secondary">Learn More</Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">📚</div>
              <h3>Tax Preparer Training</h3>
              <p>Comprehensive training courses for tax preparation professionals. Learn anytime, anywhere with our online modules.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💻</div>
              <h3>ERO Software Services</h3>
              <p>Complete Electronic Return Originator software solutions for tax professionals with advanced features and support.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📋</div>
              <h3>Tax Payer Intake Forms</h3>
              <p>Digital tax payer intake forms that simplify client onboarding and information collection process.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛠️</div>
              <h3>Business Tools</h3>
              <p>S-Corp transition kits and business tools to help you manage your practice efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <h2>Featured Products</h2>
          <div className="products-preview">
            <div className="product-preview-card">
              <div className="product-image">🎓</div>
              <h3>Complete Professional Tax Preparer Training</h3>
              <p>14-module course covering tax basics to advanced compliance and marketing strategies</p>
              <span className="price">$99.00</span>
              <Link to="/products" className="btn btn-small">View</Link>
            </div>
            <div className="product-preview-card">
              <div className="product-image">📊</div>
              <h3>S-CORP TRANSITION ONBOARDING TOOL KIT</h3>
              <p>Complete toolkit for S-Corp transitions with all necessary documentation</p>
              <span className="price">$15.00 <span className="original">$30.00</span></span>
              <Link to="/products" className="btn btn-small">View</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of tax professionals using our tools and training</p>
          <Link to="/register" className="btn btn-primary">Create Account</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
