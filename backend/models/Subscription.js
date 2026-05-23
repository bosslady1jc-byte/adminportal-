import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    enum: ['Basic', 'Professional', 'Enterprise']
  },
  billingCycle: {
    type: String,
    enum: ['quarterly', 'yearly'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  features: [String],
  status: {
    type: String,
    enum: ['active', 'inactive', 'cancelled', 'expired'],
    default: 'active'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  renewalDate: Date,
  stripeSubscriptionId: String,
  autoRenew: {
    type: Boolean,
    default: true
  },
  paymentMethod: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Subscription', subscriptionSchema);
