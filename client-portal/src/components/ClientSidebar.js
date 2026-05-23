import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingBag, FaCreditCard, FaFileAlt, FaSignOutAlt } from 'react-icons/fa';
import './ClientSidebar.css';

const ClientSidebar = () => {
  return (
    <aside className="client-sidebar">
      <nav>
        <Link to="/" className="nav-item">
          <FaUser /> Dashboard
        </Link>
        <Link to="/orders" className="nav-item">
          <FaShoppingBag /> My Orders
        </Link>
        <Link to="/subscription" className="nav-item">
          <FaCreditCard /> Subscription
        </Link>
        <Link to="/intake-forms" className="nav-item">
          <FaFileAlt /> Intake Forms
        </Link>
        <Link to="/profile" className="nav-item">
          <FaUser /> Profile
        </Link>
      </nav>
    </aside>
  );
};

export default ClientSidebar;
