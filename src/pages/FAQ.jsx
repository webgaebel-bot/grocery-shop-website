import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, Plus, Minus, HelpCircle } from 'lucide-react';
import './FAQ.css';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  const categories = [
    { id: 'orders', name: 'Orders & Shipping' },
    { id: 'products', name: 'Products' },
    { id: 'payment', name: 'Payment' },
    { id: 'returns', name: 'Returns & Refunds' },
    { id: 'account', name: 'Account' }
  ];

  const [activeCategory, setActiveCategory] = useState('orders');

  const faqData = {
    orders: [
      {
        question: 'How do I track my order?',
        answer: 'Once your order is shipped, you will receive an email with a tracking number. You can use this number on our website under "My Orders" to track your delivery status in real-time.'
      },
      {
        question: 'What are the delivery options?',
        answer: 'We offer three delivery options: Standard Delivery (3-5 business days, $5.99), Express Delivery (1-2 business days, $9.99), and Same Day Delivery (order before 2 PM, $14.99). Free delivery is available on orders over $50.'
      },
      {
        question: 'Can I change or cancel my order?',
        answer: 'You can modify or cancel your order within 30 minutes of placing it. After that, the order enters our processing system and cannot be changed. Please contact customer support immediately if you need assistance.'
      }
    ],
    products: [
      {
        question: 'Are your products organic?',
        answer: 'Many of our products are organic and clearly labeled. We work directly with local farmers and certified organic suppliers to ensure the highest quality. Look for the "Organic" label on product pages.'
      },
      {
        question: 'How do you ensure product freshness?',
        answer: 'We have strict quality control measures in place. Products are stored in temperature-controlled facilities and delivered in refrigerated vehicles when necessary. We also have a freshness guarantee - if you\'re not satisfied, we\'ll replace it.'
      },
      {
        question: 'What if a product is out of stock?',
        answer: 'If a product is out of stock, you can add it to your wishlist and we\'ll notify you when it becomes available. You can also browse similar products in the same category.'
      }
    ],
    payment: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secure and encrypted.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely. We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details on our servers.'
      },
      {
        question: 'Can I use multiple promo codes?',
        answer: 'Only one promo code can be applied per order. Promo codes cannot be combined with other offers unless explicitly stated.'
      }
    ],
    returns: [
      {
        question: 'What is your return policy?',
        answer: 'We accept returns within 7 days of delivery for most items. Perishable goods can be returned within 24 hours if they\'re not fresh. Items must be in their original condition.'
      },
      {
        question: 'How do I request a refund?',
        answer: 'Go to "My Orders" and select the order you want to return. Click on "Request Return" and follow the instructions. Refunds are processed within 5-7 business days after we receive the returned items.'
      },
      {
        question: 'What items cannot be returned?',
        answer: 'Opened perishable items, personalized products, and gift cards cannot be returned. Some health and personal care items also have restrictions.'
      }
    ],
    account: [
      {
        question: 'How do I create an account?',
        answer: 'Click on "Login" at the top of the page and then select "Create Account". Fill in your details and you\'re ready to start shopping with us.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'On the login page, click "Forgot Password" and enter your email address. We\'ll send you a link to reset your password securely.'
      },
      {
        question: 'Can I have multiple delivery addresses?',
        answer: 'Yes! You can save multiple addresses in your account settings. This makes checkout faster when you\'re ordering for home, work, or as a gift.'
      }
    ]
  };

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [`${activeCategory}-${index}`]: !prev[`${activeCategory}-${index}`]
    }));
  };

  const filteredFAQs = faqData[activeCategory].filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="faq-page">
      <div className="container">
        {/* Header */}
        <div className="faq-header">
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={16} />
            <span className="active">FAQ</span>
          </div>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our services</p>
        </div>

        {/* Search */}
        <div className="faq-search">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="faq-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <div
                key={index}
                className={`faq-item ${openItems[`${activeCategory}-${index}`] ? 'open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleItem(index)}
                >
                  <span>{item.question}</span>
                  {openItems[`${activeCategory}-${index}`] ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}
                </button>
                {openItems[`${activeCategory}-${index}`] && (
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">
              <HelpCircle size={48} />
              <p>No results found for "{searchQuery}"</p>
              <button
                className="btn btn-outline"
                onClick={() => setSearchQuery('')}
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="faq-cta">
          <h2>Still have questions?</h2>
          <p>Can't find the answer you're looking for? Please contact our support team.</p>
          <Link to="/contact" className="btn btn-primary">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
