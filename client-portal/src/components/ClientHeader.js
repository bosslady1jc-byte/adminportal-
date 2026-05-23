import React from 'react';
import { FaLogOut } from 'react-icons/fa';
import './ClientHeader.css';

const ClientHeader = ({ client, onLogout }) => {
  return (
    <header className="client-header">
      <div className="header-content">
        <div className="logo">
          <h2>Tax Portal - Client Dashboard</h2>
        </div>
        <div className="user-section">
          <span className="user-name">{client?.firstName} {client?.lastName}</span>
          <button onClick={onLogout} className="logout-btn">
            <FaLogOut /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
