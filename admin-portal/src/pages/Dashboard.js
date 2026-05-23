import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import StatCard from '../components/StatCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    activeSubscriptions: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const [usersRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/users', { headers }),
        axios.get('http://localhost:5000/api/orders', { headers })
      ]);

      const totalRevenue = ordersRes.data.reduce((sum, order) => sum + (order.total || 0), 0);

      setStats({
        totalUsers: usersRes.data.length,
        totalOrders: ordersRes.data.length,
        totalRevenue: totalRevenue,
        activeSubscriptions: Math.floor(usersRes.data.length * 0.6)
      });

      setRecentOrders(ordersRes.data.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const chartData = [
    { name: 'Jan', revenue: 4000, orders: 24 },
    { name: 'Feb', revenue: 3000, orders: 13 },
    { name: 'Mar', revenue: 2000, orders: 29 },
    { name: 'Apr', revenue: 2780, orders: 39 },
    { name: 'May', revenue: 1890, orders: 48 },
    { name: 'Jun', revenue: 2390, orders: 52 }
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <StatCard title="Total Users" value={stats.totalUsers} icon="👥" />
        <StatCard title="Total Orders" value={stats.totalOrders} icon="📦" />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} icon="💰" />
        <StatCard title="Active Subscriptions" value={stats.activeSubscriptions} icon="📊" />
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <h2>Revenue & Orders Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#0038FF" />
              <Line type="monotone" dataKey="orders" stroke="#FF6240" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map(order => (
              <tr key={order._id}>
                <td>{order.orderNumber}</td>
                <td>{order.userId?.firstName} {order.userId?.lastName}</td>
                <td>${order.total?.toFixed(2)}</td>
                <td><span className={`status ${order.status}`}>{order.status}</span></td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
