import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Package, Heart, MapPin, CreditCard, LogOut, 
  ChevronRight, Camera, Edit2 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './CustomerLayout.css';

const CustomerLayout = ({ children, activeTab }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const menuItems = [
    { id: 'profile', label: 'My Profile', icon: User, path: '/customer/profile' },
    { id: 'orders', label: 'My Orders', icon: Package, path: '/customer/orders' },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, path: '/customer/wishlist' },
    { id: 'addresses', label: 'Addresses', icon: MapPin, path: '/customer/addresses' },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard, path: '/customer/payment' },
  ];

  return (
    <div className="customer-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="customer-breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={16} />
          <span>My Account</span>
          <ChevronRight size={16} />
          <span className="active">{menuItems.find(item => item.id === activeTab)?.label}</span>
        </div>

        <div className="customer-layout">
          {/* Sidebar */}
          <aside className="customer-sidebar">
            <div className="profile-card">
              <div className="profile-avatar">
                <img src={user?.avatar} alt={user?.name} />
                <button className="edit-avatar">
                  <Camera size={14} />
                </button>
              </div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
            </div>

            <nav className="customer-nav">
              {menuItems.map(item => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                  <ChevronRight size={16} className="arrow" />
                </Link>
              ))}
            </nav>

            <button className="customer-logout" onClick={handleLogout}>
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </aside>

          {/* Main Content */}
          <main className="customer-main">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CustomerLayout;
