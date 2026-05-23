import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ClientDashboard.css';

const ClientDashboard = ({ client }) => {
  const [dashboardData, setDashboardData] = useState({
    recentOrders: [],
    subscription: null,
    intakeForms: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [ordersRes, subscriptionRes, formsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/orders/user/${client.id}`, { headers }),
        axios.get(`http://localhost:5000/api/subscriptions/user/${client.id}`, { headers }),
        axios.get(`http://localhost:5000/api/intake-forms/user/${client.id}`, { headers })
      ]).catch(err => {
        console.error('Error fetching data:', err);
        return [{ data: [] }, { data: null }, { data: [] }];
      });

      setDashboardData({
        recentOrders: ordersRes.data.slice(0, 3) || [],
        subscription: subscriptionRes.data || null,
        intakeForms: formsRes.data || []
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="client-dashboard">
      <h1>Welcome, {client.firstName}!</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📦 Recent Orders</h3>
          {dashboardData.recentOrders.length > 0 ? (
            <ul className="orders-list">
              {dashboardData.recentOrders.map(order => (
                <li key={order._id}>
                  <span>{order.orderNumber}</span>
                  <span>${order.total?.toFixed(2)}</span>
                  <span className={`status ${order.status}`}>{order.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No orders yet</p>
          )}
        </div>

        <div className="dashboard-card">
          <h3>💳 Active Subscription</h3>
          {dashboardData.subscription ? (
            <div className="subscription-info">
              <p><strong>{dashboardData.subscription.name}</strong></p>
              <p>Billing: {dashboardData.subscription.billingCycle}</p>
              <p>Price: ${dashboardData.subscription.price}</p>
              <p className={`status ${dashboardData.subscription.status}`}>
                {dashboardData.subscription.status}
              </p>
              <p>Expires: {new Date(dashboardData.subscription.endDate).toLocaleDateString()}</p>
            </div>
          ) : (
            <p>No active subscription. <a href="/subscription">Get started</a></p>
          )}
        </div>

        <div className="dashboard-card">
          <h3>📋 Tax Forms</h3>
          <p>{dashboardData.intakeForms.length} form(s) submitted</p>
          {dashboardData.intakeForms.length > 0 && (
            <div className="forms-summary">
              {dashboardData.intakeForms.map(form => (
                <p key={form._id} className={`form-status ${form.status}`}>
                  {form.formType}: {form.status}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
