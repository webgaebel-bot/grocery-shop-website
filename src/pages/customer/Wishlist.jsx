import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import CustomerLayout from '../../components/layout/CustomerLayout';
import './Wishlist.css';

const Wishlist = () => {
  const { addToCart } = useCart();
  const { success } = useToast();
  
  // Mock wishlist items (first 4 products)
  const wishlistItems = products.slice(0, 4);

  const handleAddToCart = (product) => {
    addToCart(product);
    success(`${product.name} added to cart!`);
  };

  return (
    <CustomerLayout activeTab="wishlist">
      <div className="wishlist-page">
        <div className="wishlist-header">
          <div>
            <h1>My Wishlist</h1>
            <p>{wishlistItems.length} items</p>
          </div>
          <Link to="/products" className="btn btn-outline">
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <Heart size={64} />
            <h2>Your wishlist is empty</h2>
            <p>Save items you love for later</p>
            <Link to="/products" className="btn btn-primary">
              Discover Products
            </Link>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <div className="wishlist-image">
                  <img src={item.image} alt={item.name} />
                  {item.discount > 0 && (
                    <span className="discount-badge">-{item.discount}%</span>
                  )}
                  <button className="remove-btn">
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="wishlist-info">
                  <span className="item-category">{item.category}</span>
                  <Link to={`/products/${item.id}`} className="item-name">
                    {item.name}
                  </Link>
                  
                  <div className="item-pricing">
                    <span className="current-price">${item.price.toFixed(2)}</span>
                    {item.originalPrice > item.price && (
                      <span className="original-price">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button 
                    className="btn btn-primary add-cart-btn"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
};

export default Wishlist;
