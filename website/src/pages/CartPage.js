import React, { useState } from 'react';
import './CartPage.css';

const CartPage = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Continue shopping to add items to your cart.</p>
          <a href="/products" className="btn btn-primary">Continue Shopping</a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id || item.id} className="cart-item">
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="item-price">
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item._id || item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%):</span>
            <span>${(total * 0.08).toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${(total * 1.08).toFixed(2)}</span>
          </div>
          <a href="/checkout" className="btn btn-primary btn-full">Proceed to Checkout</a>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
