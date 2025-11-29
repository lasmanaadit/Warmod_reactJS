// src/components/common/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FaDownload } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Validasi props
  if (!product) {
    console.error('ProductCard: product prop is undefined');
    return (
      <div className="product-card product-card-error">
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
    originalPrice = price,
    discount = 0,
    image = '',
    downloads = 0
  } = product;

  // Hitung harga setelah diskon
  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? Math.round(price * (1 - discount / 100)) : price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productData = {
      title: title,
      category: category,
      seller: seller,
      price: finalPrice,
      originalPrice: originalPrice,
      discount: discount,
      image: image,
      productId: id
    };
    
    addToCart(productData);
    console.log('Added to cart:', productData);
  };

  return (
    <Link to={`/product/${id}`} className="product-card" data-category={category}>
      {/* Badge Diskon */}
      {hasDiscount && (
        <div className="discount-badge">
          -{discount}%
        </div>
      )}
      
      <div className="product-image">
        {image ? (
          <img src={image} alt={title} />
        ) : (
          <div className="no-image">
            No Image
          </div>
        )}
        <div className="category-label">{category}</div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        
        {/* Pricing Section - SAMA untuk diskon dan normal */}
        <div className="product-pricing">
          {hasDiscount ? (
            <div className="pricing-with-discount">
              <div className="price-row">
                <span className="original-price">Rp {originalPrice.toLocaleString('id-ID')}</span>
                {finalPrice === 0 ? (
                  <span className="free-price">FREE</span>
                ) : (
                  <span className="final-price">Rp {finalPrice.toLocaleString('id-ID')}</span>
                )}
              </div>
            </div>
          ) : (
            <div className="pricing-normal">
              {price === 0 ? (
                <span className="free-price">FREE</span>
              ) : (
                <span className="normal-price">Rp {price.toLocaleString('id-ID')}</span>
              )}
            </div>
          )}
        </div>
        
        <div className="product-stats">
          <div className="stat">
            <FaDownload/> {downloads} Unduhan
          </div>
          {seller && (
            <div className="seller-info">
              by {seller}
            </div>
          )}
        </div>
        
        <button className="buy-button" onClick={handleAddToCart}>
          MASUKKAN KERANJANG
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;