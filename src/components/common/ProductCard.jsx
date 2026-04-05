import { Link, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/add-to-cart/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert('Added to wishlist!');
  };

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        {product.discount > 0 && (
          <span className="product-discount">-{product.discount}%</span>
        )}
        <button 
          className="wishlist-button"
          onClick={handleWishlist}
        >
          <Heart size={18} />
        </button>
        <button 
          className="quick-add-button"
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
      
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              size={14}
              fill={i < Math.floor(product.rating) ? "#FFD700" : "transparent"}
              stroke={i < Math.floor(product.rating) ? "#FFD700" : "#CBD5E0"}
            />
          ))}
          <span className="rating-count">({product.reviews})</span>
        </div>
        
        <div className="product-pricing">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {product.originalPrice > product.price && (
            <span className="product-original-price">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="product-unit">/{product.unit}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
