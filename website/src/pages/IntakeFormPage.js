import React, { useState } from 'react';
import axios from 'axios';
import './IntakeFormPage.css';

const IntakeFormPage = ({ user }) => {
  const [formType, setFormType] = useState('individual');
  const [formData, setFormData] = useState({
    ssn: '',
    dateOfBirth: '',
    maritalStatus: '',
    w2Income: []
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/api/intake-forms', {
        userId: user.id,
        formType,
        ...formData
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="intake-form-page">
        <div className="success-message">
          <h2>Thank You!</h2>
          <p>Your tax intake form has been submitted successfully.</p>
          <p>A tax professional will review your information and contact you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="intake-form-page">
      <div className="form-container">
        <h1>Tax Payer Intake Form</h1>
        <p>Please provide your tax information below</p>

        <form onSubmit={handleSubmit} className="intake-form">
          <fieldset>
            <legend>Form Type</legend>
            <div className="form-type-options">
              {['individual', 'business', 'partnership', 's-corp'].map(type => (
                <label key={type}>
                  <input
                    type="radio"
                    value={type}
                    checked={formType === type}
                    onChange={(e) => setFormType(e.target.value)}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>Personal Information</legend>
            
            <div className="form-group">
              <label htmlFor="ssn">Social Security Number</label>
              <input
                type="text"
                id="ssn"
                name="ssn"
                value={formData.ssn}
                onChange={handleChange}
                placeholder="XXX-XX-XXXX"
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="maritalStatus">Marital Status</label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="married-separate">Married Filing Separately</option>
                <option value="divorced">Divorced</option>
              </select>
            </div>
          </fieldset>

          <button type="submit" className="btn btn-primary btn-full">Submit Form</button>
        </form>
      </div>
    </div>
  );
};

export default IntakeFormPage;
