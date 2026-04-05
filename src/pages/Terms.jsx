import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-page">
      <div className="container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={16} />
          <span className="active">Terms of Service</span>
        </div>

        <div className="terms-content">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: January 1, 2024</p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using FreshCart, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to abide by the above, please 
              do not use this service.
            </p>
          </section>

          <section>
            <h2>2. Use of Service</h2>
            <p>
              FreshCart provides an online platform for purchasing grocery items. You agree to 
              use our service only for lawful purposes and in accordance with these terms. You 
              are prohibited from:
            </p>
            <ul>
              <li>Using the service in any way that violates applicable laws</li>
              <li>Attempting to interfere with the proper working of the service</li>
              <li>Accessing data not intended for you</li>
              <li>Using automated systems to access the service</li>
            </ul>
          </section>

          <section>
            <h2>3. Account Registration</h2>
            <p>
              To access certain features, you must register for an account. You agree to provide 
              accurate, current, and complete information during registration and to update such 
              information to keep it accurate, current, and complete.
            </p>
          </section>

          <section>
            <h2>4. Orders and Payment</h2>
            <p>
              All orders are subject to product availability and confirmation of the order price. 
              We reserve the right to refuse any order. When you place an order, you agree to pay 
              the specified price plus any applicable taxes and delivery charges.
            </p>
          </section>

          <section>
            <h2>5. Delivery</h2>
            <p>
              We aim to deliver products within the specified timeframes. However, delivery times 
              are estimates and not guaranteed. We are not responsible for delays beyond our control.
            </p>
          </section>

          <section>
            <h2>6. Returns and Refunds</h2>
            <p>
              Our return policy allows returns within 7 days for most items and within 24 hours 
              for perishable goods. Refunds will be processed within 5-7 business days after we 
              receive the returned items.
            </p>
          </section>

          <section>
            <h2>7. Product Information</h2>
            <p>
              We strive to provide accurate product information, but we do not warrant that product 
              descriptions, prices, or other content is accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2>8. Privacy</h2>
            <p>
              Your use of FreshCart is also governed by our Privacy Policy. Please review our 
              Privacy Policy to understand our practices.
            </p>
          </section>

          <section>
            <h2>9. Limitation of Liability</h2>
            <p>
              FreshCart shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective 
              immediately upon posting. Your continued use of the service after changes constitutes 
              acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2>11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <div className="contact-info">
              <p>Email: legal@freshcart.com</p>
              <p>Address: 123 Fresh Street, San Francisco, CA 94102</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
