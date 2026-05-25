import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './IntakeForms.css';
import IntakeFormBuilder from '../components/IntakeFormBuilder';

const IntakeForms = ({ client }) => {
  const [forms, setForms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/intake-forms/user/${client.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forms:', error);
      setLoading(false);
    }
  };

  const handleFormSubmitted = () => {
    setShowForm(false);
    fetchForms();
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="intake-forms">
      <div className="forms-header">
        <h1>Tax Intake Forms</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Form'}
        </button>
      </div>

      {showForm && (
        <IntakeFormBuilder client={client} onSubmitted={handleFormSubmitted} />
      )}

      <div className="forms-list">
        {forms.length > 0 ? (
          forms.map(form => (
            <div key={form._id} className="form-card">
              <div className="form-header">
                <h3>{form.formType}</h3>
                <span className={`status ${form.status}`}>{form.status}</span>
              </div>
              <p>Created: {new Date(form.createdAt).toLocaleDateString()}</p>
              {form.submittedAt && (
                <p>Submitted: {new Date(form.submittedAt).toLocaleDateString()}</p>
              )}
            </div>
          ))
        ) : (
          <p>No intake forms yet. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default IntakeForms;
