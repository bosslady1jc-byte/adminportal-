import express from 'express';
import Subscription from '../models/Subscription.js';

const router = express.Router();

const subscriptionPlans = {
  basic: {
    quarterly: 99,
    yearly: 300
  },
  professional: {
    quarterly: 199,
    yearly: 600
  },
  enterprise: {
    quarterly: 399,
    yearly: 1200
  }
};

// Get all subscriptions (admin)
router.get('/', async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('userId', 'firstName lastName email');
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
  }
});

// Get user's subscription
router.get('/user/:userId', async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ 
      userId: req.params.userId,
      status: { $in: ['active', 'inactive'] }
    });
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error: error.message });
  }
});

// Create subscription
router.post('/', async (req, res) => {
  try {
    const { userId, name, billingCycle } = req.body;
    
    // Get pricing
    const planKey = name.toLowerCase();
    const price = subscriptionPlans[planKey][billingCycle];
    
    // Calculate end date
    const startDate = new Date();
    const endDate = new Date();
    if (billingCycle === 'quarterly') {
      endDate.setMonth(endDate.getMonth() + 3);
    } else if (billingCycle === 'yearly') {
      endDate.setFullYear(endDate.getFullYear() + 1);
    }

    // Features based on plan
    const features = {
      basic: ['Access to Tax Forms', 'Email Support', 'Basic Analytics'],
      professional: ['Access to Tax Forms', 'ERO Software', 'Priority Support', 'Advanced Analytics', 'Client Management'],
      enterprise: ['All Professional Features', 'Dedicated Account Manager', '24/7 Support', 'Custom Integrations', 'Training Included']
    };

    const subscription = new Subscription({
      userId,
      name,
      billingCycle,
      price,
      features: features[planKey],
      startDate,
      endDate,
      renewalDate: endDate
    });

    await subscription.save();
    res.status(201).json({ message: 'Subscription created', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error: error.message });
  }
});

// Update subscription
router.put('/:id', async (req, res) => {
  try {
    const { status, autoRenew, billingCycle } = req.body;
    
    let subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    subscription.status = status || subscription.status;
    subscription.autoRenew = autoRenew !== undefined ? autoRenew : subscription.autoRenew;
    subscription.updatedAt = Date.now();

    if (billingCycle && billingCycle !== subscription.billingCycle) {
      subscription.billingCycle = billingCycle;
      const planKey = subscription.name.toLowerCase();
      subscription.price = subscriptionPlans[planKey][billingCycle];
    }

    await subscription.save();
    res.json({ message: 'Subscription updated', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription', error: error.message });
  }
});

// Cancel subscription
router.patch('/:id/cancel', async (req, res) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled', updatedAt: Date.now() },
      { new: true }
    );
    res.json({ message: 'Subscription cancelled', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling subscription', error: error.message });
  }
});

export default router;
