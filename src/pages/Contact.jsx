import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MapPin, Clock, Send, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <div className="breadcrumb">
              <Link to="/">Home</Link>
              <ChevronRight size={16} />
              <span className="active">Contact Us</span>
            </div>

            <span className="hero-eyebrow">We are here to help</span>
            <h1>Get in touch with our support team</h1>
            <p>
              Whether it is about an order, delivery timing, product questions, or general
              support, we are ready to help and usually reply within 24 hours.
            </p>

            <div className="hero-actions">
              <a href="mailto:support@freshcart.com" className="btn btn-primary">
                Email Support
                <ArrowRight size={18} />
              </a>
              <a href="tel:+15551234567" className="btn btn-outline">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main">
        <div className="container">
          <div className="contact-strip">
            <div className="support-card">
              <div className="support-icon">
                <Phone size={22} />
              </div>
              <div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <span>Mon-Fri 9am-6pm</span>
              </div>
            </div>

            <div className="support-card">
              <div className="support-icon">
                <Mail size={22} />
              </div>
              <div>
                <h3>Email</h3>
                <p>support@freshcart.com</p>
                <span>We reply within 24 hours</span>
              </div>
            </div>

            <div className="support-card">
              <div className="support-icon">
                <MapPin size={22} />
              </div>
              <div>
                <h3>Address</h3>
                <p>123 Fresh Street</p>
                <span>San Francisco, CA 94102</span>
              </div>
            </div>

            <div className="support-card">
              <div className="support-icon">
                <Clock size={22} />
              </div>
              <div>
                <h3>Working Hours</h3>
                <p>Mon - Fri: 8am - 8pm</p>
                <span>Sat - Sun: 9am - 6pm</span>
              </div>
            </div>
          </div>

          <div className="contact-layout">
            <div className="contact-info-panel">
              <span className="section-tag">Reach out anytime</span>
              <h2>Fast, friendly support for every customer</h2>
              <p className="panel-description">
                We keep it simple. Share your message below and our team will get back to you
                with the right answer, not a generic reply.
              </p>

              <div className="info-points">
                <div className="info-point">
                  <div className="point-bullet" />
                  <span>Order updates and delivery help</span>
                </div>
                <div className="info-point">
                  <div className="point-bullet" />
                  <span>Product questions and availability</span>
                </div>
                <div className="info-point">
                  <div className="point-bullet" />
                  <span>Account, billing, and support requests</span>
                </div>
              </div>

              <div className="contact-note">
                <strong>Tip:</strong> Add your order number if your message is about a recent
                purchase. It helps us respond faster.
              </div>
            </div>

            <div className="contact-form-section">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-header">
                  <h2>Send a message</h2>
                  <p>Fill in the details and we will handle the rest.</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    rows="6"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg submit-btn">
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="contact-map-card">
            <div className="map-header">
              <span className="section-tag">Visit us</span>
              <h2>Our location</h2>
              <p>Find us on the map if you need in-person assistance or want to stop by.</p>
            </div>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948502!3d37.75780956920463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="FreshCart Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
