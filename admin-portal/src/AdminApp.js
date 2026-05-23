import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AdminApp.css';
import AdminHeader from './components/AdminHeader';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ProductsManagement from './pages/ProductsManagement';
import UsersManagement from './pages/UsersManagement';
import OrdersManagement from './pages/OrdersManagement';
import SubscriptionsManagement from './pages/SubscriptionsManagement';
import IntakeFormsManagement from './pages/IntakeFormsManagement';

const API_BASE_URL = 'http://localhost:5000/api';

function AdminApp() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && user.role === 'admin') {
      setAdmin(user);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAdmin(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/login" />;
  }

  return (
    <Router>
      <div className="admin-app">
        <AdminHeader admin={admin} onLogout={handleLogout} />
        <div className="admin-container">
          <Sidebar />
          <main className="admin-main">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductsManagement />} />
              <Route path="/users" element={<UsersManagement />} />
              <Route path="/orders" element={<OrdersManagement />} />
              <Route path="/subscriptions" element={<SubscriptionsManagement />} />
              <Route path="/intake-forms" element={<IntakeFormsManagement />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default AdminApp;
