import React, { useState, useEffect } from 'axios';
import axios from 'axios';
import './MySubscription.css';

const MySubscription = ({ client }) => {
  const [subscription, setSubscription] = useState(null);
  const [showPlans, setShowPlans] = useState(!subscription);
  const [loading, setLoading] = useState(true);

  const plans = {
    basic: {
      name: 'Basic',
      quarterly: 99,
      yearly: 300,
      features: ['Access to Tax Forms', 'Email Support', 'Basic Analytics']
    },
    professional: {
      name: 'Professional',
      quarterly: 199,
      yearly: 600,
      features: ['Access to Tax Forms', 'ERO Software', 'Priority Support', 'Advanced Analytics', 'Client Management']
    },
    enterprise: {
      name: 'Enterprise',
      quarterly: 399,
      yearly: 1200,
      features: ['All Professional Features', 'Dedicated Account Manager', '24/7 Support', 'Custom Integrations', 'Training Included']
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/subscriptions/user/${client.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubscription(response.data);
      setShowPlans(!response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subscription:', error);
      setLoading(false);
    }
  };

  const handleSelectPlan = async (planName, billingCycle) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/subscriptions',
        {
          userId: client.id,
          name: planName,
          billingCycle
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSubscription(response.data.subscription);
      setShowPlans(false);
    } catch (error) {
      console.error('Error creating subscription:', error);
      alert('Error creating subscription');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="my-subscription">
      <h1>My Subscription</h1>

      {subscription ? (
        <div className="subscription-details">
          <div className="subscription-card">
            <h2>{subscription.name} Plan</h2>
            <p className="price">${subscription.price}</p>
            <p className="cycle">{subscription.billingCycle}</p>
            <p className={`status ${subscription.status}`}>{subscription.status}</p>
            
            <div className="subscription-dates">
              <p><strong>Start Date:</strong> {new Date(subscription.startDate).toLocaleDateString()}</p>
              <p><strong>End Date:</strong> {new Date(subscription.endDate).toLocaleDateString()}</p>
              <p><strong>Auto Renew:</strong> {subscription.autoRenew ? 'Yes' : 'No'}</p>
            </div>

            <div className="subscription-features">
              <h3>Features Included:</h3>
              <ul>
                {subscription.features?.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>

            {subscription.status === 'active' && (
              <button className="btn btn-secondary" onClick={() => setShowPlans(true)}>
                Change Plan
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="no-subscription">
          <p>You don't have an active subscription yet.</p>
        </div>
      )}

      {showPlans && (
        <div className="subscription-plans">
          <h2>Choose Your Plan</h2>
          <div className="plans-grid">
            {Object.entries(plans).map(([key, plan]) => (
              <div key={key} className="plan-card">
                <h3>{plan.name}</h3>
                <div className="plan-options">
                  <button className="plan-option">
                    <span className="price">${plan.quarterly}</span>
                    <span className="term">Quarterly</span>
                    <span className="select-btn" onClick={() => handleSelectPlan(plan.name, 'quarterly')}>
                      Select
                    </span>
                  </button>
                  <button className="plan-option">
                    <span className="price">${plan.yearly}</span>
                    <span className="term">Yearly</span>
                    <span className="savings">Save 20%</span>
                    <span className="select-btn" onClick={() => handleSelectPlan(plan.name, 'yearly')}>
                      Select
                    </span>
                  </button>
                </div>
                <ul className="features">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MySubscription;
