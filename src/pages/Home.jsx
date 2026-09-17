import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Clock, Headphones, Star, TrendingUp, Percent } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/common/ProductCard';
import './Home.css';

const Home = () => {
  const [featuredProducts] = useState(() => products.filter(p => p.featured).slice(0, 4));
  const [newArrivals] = useState(() => [...products].reverse().slice(0, 4));
  const [topRated] = useState(() => [...products].sort((a, b) => b.rating - a.rating).slice(0, 4));

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              <Percent size={16} />
              Up to 50% Off on Fresh Produce
            </span>
            <h1 className="hero-title">
              Fresh Groceries<br />
              <span className="highlight">Delivered to You</span>
            </h1>
            <p className="hero-description">
              Shop from our wide selection of fresh fruits, vegetables, dairy, meat, and more. 
              Get same-day delivery with the best quality guaranteed.
            </p>
            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary btn-lg">
                Shop Now
                <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="btn btn-outline btn-lg">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">15K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Products</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2hr</span>
                <span className="stat-label">Fast Delivery</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800" 
              alt="Fresh groceries" 
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Truck size={32} />
              </div>
              <h3>Free Delivery</h3>
              <p>Free delivery on orders over $50</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3>Quality Guarantee</h3>
              <p>100% fresh & quality products</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={32} />
              </div>
              <h3>Same Day Delivery</h3>
              <p>Order before 2 PM for same day</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Headphones size={32} />
              </div>
              <h3>24/7 Support</h3>
              <p>Round the clock assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Shop by Category</h2>
            <Link to="/products" className="view-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/products?category=${encodeURIComponent(category.name)}`}
                className="category-card"
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
                </div>
                <h3 className="category-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section featured-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">Handpicked favorites just for you</p>
            </div>
            <Link to="/products" className="btn btn-outline">
              View All Products
            </Link>
          </div>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="banner-section">
        <div className="container">
          <div className="banner-content">
            <div className="banner-text">
              <span className="banner-badge">Limited Time Offer</span>
              <h2 className="banner-title">Get 20% Off on Your First Order</h2>
              <p className="banner-description">
                Use code <strong>FRESH20</strong> at checkout and enjoy the discount on your first purchase.
              </p>
              <Link to="/products" className="btn btn-secondary btn-lg">
                Shop Now <ArrowRight size={20} />
              </Link>
            </div>
            <div className="banner-image">
              <img 
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600" 
                alt="Special offer" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <TrendingUp size={24} />
                New Arrivals
              </h2>
              <p className="section-subtitle">Check out the latest additions</p>
            </div>
            <Link to="/products" className="btn btn-outline">
              View All
            </Link>
          </div>
          <div className="products-grid">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="products-section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">
                <Star size={24} />
                Top Rated Products
              </h2>
              <p className="section-subtitle">Customer favorites with highest ratings</p>
            </div>
            <Link to="/products" className="btn btn-outline">
              View All
            </Link>
          </div>
          <div className="products-grid">
            {topRated.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title text-center">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" stroke="#FFD700" />
                ))}
              </div>
              <p className="testimonial-text">
                "Amazing quality and fast delivery! FreshCart has become my go-to for grocery shopping."
              </p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Customer" />
                <div>
                  <h4>John Smith</h4>
                  <span>Regular Customer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" stroke="#FFD700" />
                ))}
              </div>
              <p className="testimonial-text">
                "The fruits and vegetables are always fresh. Great prices and excellent customer service!"
              </p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Customer" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <span>Regular Customer</span>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#FFD700" stroke="#FFD700" />
                ))}
              </div>
              <p className="testimonial-text">
                "Love the app interface and the delivery is always on time. Highly recommended!"
              </p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Customer" />
                <div>
                  <h4>Michael Brown</h4>
                  <span>Regular Customer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <h2 className="newsletter-title">Subscribe to Our Newsletter</h2>
            <p className="newsletter-description">
              Get the latest updates on new products, special offers, and exclusive discounts.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
