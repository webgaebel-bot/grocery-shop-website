import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid3X3, LayoutList, ChevronDown, X } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/common/ProductCard';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedRating, setSelectedRating] = useState(0);
  const [showDiscounted, setShowDiscounted] = useState(false);
  
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    
    // Filter by rating
    if (selectedRating > 0) {
      result = result.filter(p => p.rating >= selectedRating);
    }
    
    // Filter discounted products
    if (showDiscounted) {
      result = result.filter(p => p.discount > 0);
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'discount':
        result.sort((a, b) => b.discount - a.discount);
        break;
      default:
        // Keep original order for featured
        break;
    }
    
    return result;
  }, [searchQuery, selectedCategory, priceRange, selectedRating, showDiscounted, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setPriceRange({ min: 0, max: 100 });
    setSearchQuery('');
    setSelectedRating(0);
    setShowDiscounted(false);
    setSearchParams({});
  };

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (priceRange.min > 0 || priceRange.max < 100) count++;
    if (selectedRating > 0) count++;
    if (showDiscounted) count++;
    if (searchQuery) count++;
    return count;
  }, [selectedCategory, priceRange, selectedRating, showDiscounted, searchQuery]);

  return (
    <div className="products-page">
      <div className="container">
        {/* Page Header */}
        <div className="products-header">
          <div className="breadcrumb">
            <span>Home</span>
            <span>/</span>
            <span className="active">Products</span>
          </div>
          <h1 className="page-title">
            {searchQuery ? `Search results for "${searchQuery}"` : 
             selectedCategory !== 'all' ? selectedCategory : 'All Products'}
          </h1>
          <p className="products-count">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        <div className="products-layout">
          {/* Sidebar Filters */}
          <aside className={`filters-sidebar ${showFilters ? 'show' : ''}`}>
            <div className="filters-header">
              <h3>
                <Filter size={20} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="filter-badge">{activeFiltersCount}</span>
                )}
              </h3>
              <button className="close-filters" onClick={() => setShowFilters(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className="filter-section">
              <h4>Categories</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === 'all'}
                    onChange={() => handleCategoryChange('all')}
                  />
                  <span>All Categories</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => handleCategoryChange(category.name)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-section">
              <h4>Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                />
                <span>to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                />
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="price-slider"
              />
            </div>

            {/* Rating Filter */}
            <div className="filter-section">
              <h4>Minimum Rating</h4>
              <div className="filter-options">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="filter-option">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                    />
                    <span className="rating-stars">
                      {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                    </span>
                    <span>& Up</span>
                  </label>
                ))}
                <label className="filter-option">
                  <input
                    type="radio"
                    name="rating"
                    checked={selectedRating === 0}
                    onChange={() => setSelectedRating(0)}
                  />
                  <span>Any Rating</span>
                </label>
              </div>
            </div>

            {/* Special Offers */}
            <div className="filter-section">
              <h4>Special Offers</h4>
              <label className="filter-option checkbox">
                <input
                  type="checkbox"
                  checked={showDiscounted}
                  onChange={(e) => setShowDiscounted(e.target.checked)}
                />
                <span>On Sale</span>
              </label>
            </div>

            <button className="btn btn-outline clear-filters" onClick={clearFilters}>
              Clear All Filters
            </button>
          </aside>

          {/* Products Grid */}
          <div className="products-content">
            {/* Toolbar */}
            <div className="products-toolbar">
              <button 
                className="mobile-filter-btn"
                onClick={() => setShowFilters(true)}
              >
                <Filter size={18} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="filter-badge">{activeFiltersCount}</span>
                )}
              </button>

              <div className="sort-dropdown">
                <span>Sort by:</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="discount">Biggest Discount</option>
                </select>
                <ChevronDown size={16} />
              </div>

              <div className="view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 size={18} />
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={`products-grid ${viewMode}`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search query</p>
                <button className="btn btn-primary" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
