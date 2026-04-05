import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="error-code">404</div>
          <h1>Page Not Found</h1>
          <p>
            Sorry, we couldn't find the page you're looking for. 
            It might have been moved or doesn't exist.
          </p>
          
          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              <Home size={20} />
              Go Home
            </Link>
            <Link to="/products" className="btn btn-outline btn-lg">
              <Search size={20} />
              Browse Products
            </Link>
          </div>

          <button 
            className="back-btn"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
