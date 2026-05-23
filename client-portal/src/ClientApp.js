import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import './ClientApp.css';
import ClientHeader from './components/ClientHeader';
import ClientSidebar from './components/ClientSidebar';
import ClientDashboard from './pages/ClientDashboard';
import MyOrders from './pages/MyOrders';
import MySubscription from './pages/MySubscription';
import IntakeForms from './pages/IntakeForms';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';

const API_BASE_URL = 'http://localhost:5000/api';

function ClientApp() {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (token && user.role === 'client') {
      setClient(user);
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setClient(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!client) {
    return <Navigate to="/login" />;
  }

  return (
    <Router>
      <div className="client-app">
        <ClientHeader client={client} onLogout={handleLogout} />
        <div className="client-container">
          <ClientSidebar />
          <main className="client-main">
            <Routes>
              <Route path="/" element={<ClientDashboard client={client} />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/subscription" element={<MySubscription client={client} />} />
              <Route path="/intake-forms" element={<IntakeForms client={client} />} />
              <Route path="/profile" element={<Profile client={client} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default ClientApp;
