import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/orders/user/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-orders">
      <h1>My Orders</h1>

      {orders.length > 0 ? (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>{order.orderNumber}</h3>
                <span className={`status ${order.status}`}>{order.status}</span>
              </div>
              <div className="order-details">
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ${order.total?.toFixed(2)}</p>
                <p><strong>Payment:</strong> <span className={`payment ${order.paymentStatus}`}>{order.paymentStatus}</span></p>
              </div>
              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items?.map((item, idx) => (
                    <li key={idx}>{item.name} x{item.quantity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-orders">No orders yet. <a href="/products">Continue shopping</a></p>
      )}
    </div>
  );
};

export default MyOrders;
