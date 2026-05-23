import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartBar, FaBox, FaUsers, FaShoppingBag, FaFileAlt, FaBell } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <Link to="/admin" className="nav-item">
          <FaChartBar /> Dashboard
        </Link>
        <Link to="/admin/products" className="nav-item">
          <FaBox /> Products
        </Link>
        <Link to="/admin/users" className="nav-item">
          <FaUsers /> Users
        </Link>
        <Link to="/admin/orders" className="nav-item">
          <FaShoppingBag /> Orders
        </Link>
        <Link to="/admin/subscriptions" className="nav-item">
          <FaBell /> Subscriptions
        </Link>
        <Link to="/admin/intake-forms" className="nav-item">
          <FaFileAlt /> Intake Forms
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
