import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubscriptionsManagement.css';

const SubscriptionsManagement = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/subscriptions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscriptions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setLoading(false);
    }
  };

  const cancelSubscription = async (subscriptionId) => {
    if (!window.confirm('Are you sure you want to cancel this subscription?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/subscriptions/${subscriptionId}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchSubscriptions();
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      alert('Error cancelling subscription');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const totalRevenue = subscriptions.reduce((sum, sub) => sum + (sub.price || 0), 0);
  const activeCount = subscriptions.filter(s => s.status === 'active').length;

  return (
    <div className="subscriptions-management">
      <h1>Subscriptions Management</h1>

      <div className="subscriptions-stats">
        <div className="stat-card">
          <h3>Active Subscriptions</h3>
          <p className="stat-value">{activeCount}</p>
        </div>
        <div className="stat-card">
          <h3>Monthly Revenue</h3>
          <p className="stat-value">${(totalRevenue / 12).toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Annual Revenue</h3>
          <p className="stat-value">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="subscriptions-table">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Plan</th>
              <th>Billing Cycle</th>
              <th>Price</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(sub => (
              <tr key={sub._id}>
                <td>{sub.userId?.firstName} {sub.userId?.lastName}</td>
                <td>{sub.name}</td>
                <td>{sub.billingCycle}</td>
                <td>${sub.price}</td>
                <td><span className={`status ${sub.status}`}>{sub.status}</span></td>
                <td>{new Date(sub.startDate).toLocaleDateString()}</td>
                <td>{new Date(sub.endDate).toLocaleDateString()}</td>
                <td>
                  {sub.status === 'active' && (
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => cancelSubscription(sub._id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionsManagement;
