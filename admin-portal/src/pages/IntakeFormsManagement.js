import React, { useState, useEffect } from 'axios';
import axios from 'axios';
import './IntakeFormsManagement.css';

const IntakeFormsManagement = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedForm, setSelectedForm] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/intake-forms', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForms(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forms:', error);
      setLoading(false);
    }
  };

  const updateFormStatus = async (formId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/intake-forms/${formId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchForms();
    } catch (error) {
      console.error('Error updating form:', error);
      alert('Error updating form');
    }
  };

  const filteredForms = filter === 'all'
    ? forms
    : forms.filter(f => f.status === filter);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="intake-forms-management">
      <h1>Tax Intake Forms Management</h1>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Forms ({forms.length})
        </button>
        {['draft', 'submitted', 'review', 'completed'].map(status => (
          <button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="forms-table">
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Form Type</th>
              <th>Status</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredForms.map(form => (
              <tr key={form._id}>
                <td>{form.userId?.firstName} {form.userId?.lastName}</td>
                <td>{form.formType}</td>
                <td>
                  <select
                    value={form.status}
                    onChange={(e) => updateFormStatus(form._id, e.target.value)}
                    className={`status-select ${form.status}`}
                  >
                    <option value="draft">Draft</option>
                    <option value="submitted">Submitted</option>
                    <option value="review">In Review</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>{form.submittedAt ? new Date(form.submittedAt).toLocaleDateString() : '-'}</td>
                <td><button className="btn btn-small" onClick={() => setSelectedForm(form)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedForm && (
        <div className="form-detail-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedForm(null)}>×</button>
            <h2>Form Details</h2>
            <div className="form-details">
              <p><strong>Client:</strong> {selectedForm.userId?.firstName} {selectedForm.userId?.lastName}</p>
              <p><strong>Type:</strong> {selectedForm.formType}</p>
              <p><strong>Status:</strong> {selectedForm.status}</p>
              <p><strong>SSN:</strong> {selectedForm.ssn}</p>
              <p><strong>Date of Birth:</strong> {selectedForm.dateOfBirth}</p>
              <p><strong>Marital Status:</strong> {selectedForm.maritalStatus}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntakeFormsManagement;
