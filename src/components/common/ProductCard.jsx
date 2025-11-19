// src/components/common/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart'; // ← PATH YANG BENAR
import { FaDownload } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Validasi props
  if (!product) {
    console.error('ProductCard: product prop is undefined');
    return (
      <div className="product-card" style={{ border: '2px solid red' }}>
        <div className="product-info">
          <h3>Error: Product data missing</h3>
          <p>Product information is not available</p>
        </div>
      </div>
    );
  }

  const {
    id = 0,
    title = 'Unknown Product',
    category = 'Unknown Category',
    seller = 'Unknown Seller',
    price = 0,
    image = '',
    downloads = 0
  } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productData = {
      title: title,
      category: category,
      seller: seller,
      price: price,
      image: image
    };
    
    addToCart(productData);
    console.log('Added to cart:', productData);
  };

  return (
    <Link to={`/product/${id}`} className="product-card" data-category={category}>
      <div className="product-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div style={{
            width: '100%',
            height: '180px',
            background: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666'
          }}>
            No Image
          </div>
        )}
        <div className="category-label">{category}</div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <div className="product-price">Rp.{price.toLocaleString()}</div>
        
        <div className="product-stats">
          <div className="stat">
            <FaDownload/> {downloads} Unduhan
          </div>
          {seller && (
            <div className="stat" style={{ fontSize: '12px', color: '#666' }}>
              by {seller}
            </div>
          )}
        </div>
        
        <div className="buy-button" onClick={handleAddToCart}>
          MASUKAN KERANJANG
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;