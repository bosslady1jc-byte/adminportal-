import express from 'express';

const router = express.Router();

// Simple in-memory cart storage (in production, use database)
const carts = new Map();

// Get cart
router.get('/:userId', (req, res) => {
  try {
    const cart = carts.get(req.params.userId) || { items: [], total: 0 };
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
});

// Add to cart
router.post('/:userId/add', (req, res) => {
  try {
    const { productId, name, price, quantity } = req.body;
    const userId = req.params.userId;
    
    let cart = carts.get(userId) || { items: [], total: 0 };
    
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, name, price, quantity: quantity || 1 });
    }
    
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    carts.set(userId, cart);
    
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
});

// Remove from cart
router.post('/:userId/remove', (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.params.userId;
    
    let cart = carts.get(userId) || { items: [], total: 0 };
    cart.items = cart.items.filter(item => item.productId !== productId);
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    carts.set(userId, cart);
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Error removing from cart', error: error.message });
  }
});

// Clear cart
router.post('/:userId/clear', (req, res) => {
  try {
    const userId = req.params.userId;
    carts.set(userId, { items: [], total: 0 });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart', error: error.message });
  }
});

export default router;
