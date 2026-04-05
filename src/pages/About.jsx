import { Link } from 'react-router-dom';
import { ChevronRight, Leaf, Truck, Shield, Heart, Users, Award } from 'lucide-react';
import './About.css';

const About = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Fresh & Organic',
      description: 'We source only the freshest, organic produce from local farmers and trusted suppliers.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Same-day delivery available. Get your groceries delivered within 2 hours in select areas.'
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: '100% satisfaction guaranteed. If you\'re not happy, we\'ll make it right.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. Your satisfaction is our priority.'
    }
  ];

  const stats = [
    { value: '15K+', label: 'Happy Customers' },
    { value: '10K+', label: 'Products Available' },
    { value: '50+', label: 'Partner Farmers' },
    { value: '99%', label: 'Satisfaction Rate' }
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={16} />
            <span className="active">About Us</span>
          </div>
          <div className="hero-content">
            <h1>Bringing Freshness to Your Doorstep</h1>
            <p>
              FreshCart was founded with a simple mission: to make fresh, high-quality groceries 
              accessible to everyone. Since 2020, we've been connecting local farmers and producers 
              with customers who value quality and convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-image">
              <img 
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800" 
                alt="Fresh produce" 
              />
            </div>
            <div className="story-content">
              <h2>Our Story</h2>
              <p>
                What started as a small family business has grown into one of the most trusted 
                online grocery platforms. Our founder, inspired by the lack of fresh produce options 
                in urban areas, set out to bridge the gap between local farmers and city dwellers.
              </p>
              <p>
                Today, we work with over 50 local farms and producers to bring you the freshest 
                fruits, vegetables, dairy, and more. Every product in our store is carefully 
                selected to meet our high standards of quality and freshness.
              </p>
              <div className="signature">
                <p>The FreshCart Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="section-header text-center">
            <h2>Our Values</h2>
            <p>What makes us different from the rest</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">
                  <value.icon size={32} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team">
        <div className="container">
          <div className="section-header text-center">
            <h2>Meet Our Team</h2>
            <p>The people behind FreshCart</p>
          </div>
          <div className="team-grid">
            <div className="team-member">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" 
                alt="Team member" 
              />
              <h3>Michael Chen</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" 
                alt="Team member" 
              />
              <h3>Sarah Johnson</h3>
              <p>Operations Director</p>
            </div>
            <div className="team-member">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" 
                alt="Team member" 
              />
              <h3>David Williams</h3>
              <p>Head of Technology</p>
            </div>
            <div className="team-member">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" 
                alt="Team member" 
              />
              <h3>Emily Davis</h3>
              <p>Customer Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience FreshCart?</h2>
            <p>Join thousands of happy customers and start shopping today</p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Start Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
