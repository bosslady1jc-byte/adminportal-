import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductsPage.css';

const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api'}/products`);
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const categories = ['All', 'Tax Training', 'ERO Software', 'Tax Forms', 'Bundles'];

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === category));
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products & Services</h1>
        <p>Professional tax preparation tools and training</p>
      </div>

      <div className="products-container">
        <aside className="sidebar">
          <h3>Categories</h3>
          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <main className="products-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="image-placeholder">No Image</div>
                  )}
                  {product.discount > 0 && (
                    <div className="discount-badge">{product.discount}% OFF</div>
                  )}
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p className="description">{product.description}</p>
                  <div className="product-price">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="product-actions">
                    <Link to={`/products/${product._id}`} className="view-btn">
                      View Details
                    </Link>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
