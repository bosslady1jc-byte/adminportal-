import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/products/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="error">Product not found</div>;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="product-detail">
      <div className="detail-container">
        <div className="detail-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="image-placeholder">No Image Available</div>
          )}
        </div>

        <div className="detail-content">
          <h1>{product.name}</h1>
          
          <div className="detail-price">
            <span className="current">${product.price}</span>
            {product.originalPrice && (
              <span className="original">${product.originalPrice}</span>
            )}
            {product.discount > 0 && (
              <span className="discount">{product.discount}% OFF</span>
            )}
          </div>

          <div className="detail-description">
            <h3>Description</h3>
            <p>{product.longDescription || product.description}</p>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="detail-features">
              <h3>Features</h3>
              <ul>
                {product.features.map((feature, idx) => (
                  <li key={idx}>✓ {feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="detail-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Quantity:</label>
              <select 
                id="quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary btn-large" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>

          {product.accessDuration && (
            <div className="detail-info">
              <p><strong>Access Duration:</strong> {product.accessDuration}</p>
              <p><strong>Type:</strong> {product.isDigital ? 'Digital' : 'Physical'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
