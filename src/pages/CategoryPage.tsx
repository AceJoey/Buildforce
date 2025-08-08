import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, X } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const subcategory = searchParams.get('subcategory');
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showInStock, setShowInStock] = useState(false);
  const [showDeals, setShowDeals] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const category = categories.find(c => c.id === categoryId);
  
  const filteredProducts = useMemo(() => {
    // Debug: Log all products and category info
    console.log('All products:', products.length);
    console.log('Category ID:', categoryId);
    console.log('Products with Commercial Equipment category:', products.filter(p => p.category === 'Commercial Equipment'));
    
    let filtered = products.filter(product => {
      const productCategorySlug = product.category.toLowerCase().replace(/\s+/g, '-');
      const matchesCategory = productCategorySlug === categoryId;
      
      // Handle subcategory filtering
      let matchesSubcategory = true;
      if (selectedSubcategories.length > 0) {
        matchesSubcategory = selectedSubcategories.includes(product.subcategory);
      } else if (subcategory) {
        matchesSubcategory = product.subcategory === subcategory;
      }
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesStock = !showInStock || product.inStock;
      const matchesDeals = !showDeals || product.isDeal;
      
      return matchesCategory && matchesSubcategory && matchesPrice && matchesStock && matchesDeals;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [categoryId, subcategory, selectedSubcategories, priceRange, showInStock, showDeals, sortBy]);

  // Filter functions
  const handleSubcategoryToggle = (subcategoryName: string) => {
    setSelectedSubcategories(prev => {
      if (prev.includes(subcategoryName)) {
        return prev.filter(sub => sub !== subcategoryName);
      } else {
        return [...prev, subcategoryName];
      }
    });
  };

  const handleShowAllSubcategories = () => {
    setSelectedSubcategories([]);
  };

  const handleClearAllFilters = () => {
    setSelectedSubcategories([]);
    setPriceRange([0, 100000]);
    setShowInStock(false);
    setShowDeals(false);
  };

  const isAllSelected = selectedSubcategories.length === 0;
  const selectedCount = selectedSubcategories.length;
  const hasActiveFilters = selectedCount > 0 || showInStock || showDeals || priceRange[1] < 100000;

  if (!category) {
    return (
      <div className="bg-gray-50 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
        </div>
      </div>
    );
  }

  const FilterSidebar = () => (
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </h3>

              {/* Subcategory Filter */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm">Subcategories</h4>
                  {selectedCount > 0 && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {selectedCount} selected
                    </span>
                  )}
                </div>
                <div className="space-y-1.5">
                  {/* Show All Option */}
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={handleShowAllSubcategories}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Show All ({category.subcategories.length})
                    </span>
                  </label>
                  
                  {/* Individual Subcategories */}
                  {category.subcategories.map((sub) => (
                    <label key={sub} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(sub)}
                        onChange={() => handleSubcategoryToggle(sub)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{sub}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">Price Range</h4>
                <div className="space-y-1.5">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>KSh 0</span>
                    <span>KSh {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Other Filters */}
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showDeals}
                    onChange={(e) => setShowDeals(e.target.checked)}
                    className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">On Sale</span>
                </label>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <div className="pt-3 border-t border-gray-200">
                  <button
                    onClick={handleClearAllFilters}
                    className="w-full text-sm text-gray-600 hover:text-gray-800 py-2 px-3 rounded-md border border-gray-300 hover:border-gray-400 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
  );

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        {/* Category Header - Mobile */}
        <div className="md:hidden mb-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {category.name}
              {subcategory && ` - ${subcategory}`}
            </h1>
            <p className="text-gray-600 text-sm">
              {filteredProducts.length} products found
            </p>
          </div>
        </div>

        {/* Category Header - Desktop */}
        <div className="hidden md:block mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-bold text-gray-900">
                {category.name}
                {subcategory && ` - ${subcategory}`}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
              
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

                  {/* Mobile Controls */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-between">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>

              {/* Filter Indicator */}
              {hasActiveFilters && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Filters Active
                  </span>
                  <button
                    onClick={handleClearAllFilters}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    Clear
                  </button>
                </div>
              )}
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="flex items-center space-x-2 bg-green-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:col-span-1">
            <FilterSidebar />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-4 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-full">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}