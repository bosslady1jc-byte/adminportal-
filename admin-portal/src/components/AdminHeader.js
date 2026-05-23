import React from 'react';
import { FaLogOut } from 'react-icons/fa';
import './AdminHeader.css';

const AdminHeader = ({ admin, onLogout }) => {
  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="logo">
          <h2>Admin Portal</h2>
        </div>
        <div className="user-section">
          <span className="user-name">{admin?.firstName} {admin?.lastName}</span>
          <button onClick={onLogout} className="logout-btn">
            <FaLogOut /> Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
