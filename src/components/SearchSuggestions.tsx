import React from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Product } from '../types';
import { productDataService } from '../services/productDataService';

interface SearchSuggestionsProps {
  query: string;
  isVisible: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  query,
  isVisible,
  onClose,
  onSelectProduct
}) => {
  const [products, setProducts] = React.useState<Product[]>([]);

  // Search function
  const searchProducts = (products: Product[], query: string): Product[] => {
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.subcategory.toLowerCase().includes(searchTerm)
    );
  };

  // Get products from service
  React.useEffect(() => {
    const loadProducts = async () => {
      const allProducts = productDataService.getAllProducts();
      const results = searchProducts(allProducts, query);
      setProducts(results.slice(0, 6)); // Limit to 6 suggestions
    };
    
    if (query.trim() && isVisible) {
      loadProducts();
    } else {
      setProducts([]);
    }
  }, [query, isVisible]);

  // Handle keyboard navigation and click outside
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isVisible) return;
      
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest('.search-suggestions')) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible || !query.trim()) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-25 z-40"
        onClick={onClose}
      />
      
      {/* Suggestions Modal */}
      <div className="fixed top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl z-50 search-suggestions">
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Search results for "{query}"
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto">
            {products.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onSelectProduct(product)}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-contain rounded-lg"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate">
                          {product.category} • {product.subcategory}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm font-semibold text-green-600">
                            KES {product.price.toLocaleString()}
                          </span>
                          {product.discountPercentage > 0 && (
                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
                              {product.discountPercentage}% OFF
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* View Button */}
                      <div className="flex-shrink-0">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* View All Results Link */}
                <div className="p-4 border-t border-gray-200">
                  <Link
                    to={`/search?q=${encodeURIComponent(query)}`}
                    className="block text-center text-sm text-green-600 hover:text-green-700 font-medium"
                    onClick={onClose}
                  >
                    View all {products.length} results →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 text-sm">
                  No products found for "{query}"
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Try different keywords or browse categories
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchSuggestions; 