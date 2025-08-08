import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Grid } from 'lucide-react';
import { categories } from '../data/mockData';

const HoverCategoryMenu: React.FC = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <div className="relative group">
      {/* Main category button */}
      <div className="flex items-center space-x-2 py-2 px-4 cursor-pointer hover:bg-green-600/20 rounded-lg transition-colors">
        <Grid className="w-5 h-5 text-yellow-300" />
        <span className="font-medium text-white">Shop by Category</span>
      </div>

      {/* Dropdown container */}
      <div className="absolute left-0 top-full mt-1 hidden group-hover:flex bg-white shadow-xl rounded-lg border border-gray-200 z-50 animate-fadeIn">
        {/* Categories list */}
        <div className="w-64 py-2">
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`px-4 py-2 hover:bg-green-50 cursor-pointer ${hoveredCategory === category.id ? 'bg-green-50' : ''}`}
              onMouseEnter={() => setHoveredCategory(category.id)}
            >
              <div className="flex items-center justify-between">
                <Link 
                  to={`/category/${category.id}`}
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Subcategories panel */}
        {hoveredCategory && (
          <div className="w-64 py-4 px-6 bg-white border-l border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-100">
              {categories.find(cat => cat.id === hoveredCategory)?.name}
            </h3>
            <div className="space-y-2">
              <Link
                to={`/category/${hoveredCategory}`}
                className="block text-green-600 hover:text-green-700 font-medium"
              >
                View All {categories.find(cat => cat.id === hoveredCategory)?.name}
              </Link>
              {categories
                .find(cat => cat.id === hoveredCategory)
                ?.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    to={`/category/${hoveredCategory}?subcategory=${encodeURIComponent(subcategory)}`}
                    className="block text-gray-600 hover:text-green-600 transition-colors py-1"
                  >
                    {subcategory}
                  </Link>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HoverCategoryMenu;