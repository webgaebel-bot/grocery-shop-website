import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Search, ChevronDown, LogOut, Package, Heart, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛒</span>
          <span className="logo-text">FreshCart</span>
        </Link>

        <form className="search-form" onSubmit={handleSearch}>
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search for groceries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>

        <nav className="nav-menu">
          <Link to="/products" className="nav-link">Products</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>

        <div className="header-actions">
          <Link to="/customer/cart" className="cart-link">
            <ShoppingCart size={24} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>

          {isAuthenticated() ? (
            <div className="user-menu">
              <button 
                className="user-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="user-avatar"
                />
                <ChevronDown size={16} />
              </button>
              
              {isUserMenuOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-name">{user.name}</p>
                    <p className="dropdown-email">{user.email}</p>
                  </div>
                  <Link 
                    to="/customer/profile" 
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User size={16} />
                    My Profile
                  </Link>
                  <Link 
                    to="/customer/orders" 
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Package size={16} />
                    My Orders
                  </Link>
                  <Link 
                    to="/customer/wishlist" 
                    className="dropdown-item"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Heart size={16} />
                    Wishlist
                  </Link>
                  {user.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings size={16} />
                      Admin Panel
                    </Link>
                  )}
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}

          <button 
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          <form className="mobile-search-form" onSubmit={handleSearch}>
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search for groceries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </form>
          <nav className="mobile-nav">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
            <Link to="/terms" onClick={() => setIsMenuOpen(false)}>Terms</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
