import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Get all orders (admin)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'firstName lastName email').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Get user's orders
router.get('/user/:userId', async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// Create order
router.post('/', async (req, res) => {
  try {
    const { userId, items, shippingAddress } = req.body;
    
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;
    
    const orderNumber = `ORD-${Date.now()}`;

    const order = new Order({
      orderNumber,
      userId,
      items,
      subtotal,
      tax,
      total,
      shippingAddress
    });

    await order.save();
    res.status(201).json({ message: 'Order created', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// Update order status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    
    let order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status || order.status;
    order.paymentStatus = paymentStatus || order.paymentStatus;
    if (status === 'completed' && !order.completedAt) {
      order.completedAt = Date.now();
    }
    order.updatedAt = Date.now();

    await order.save();
    res.json({ message: 'Order updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
});

export default router;
