import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Grid } from 'lucide-react';
import { categories } from '../data/mockData';

export default function CategoryOverlay() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
      <div className="container mx-auto px-4 h-full">
        <div className="flex h-full">
          {/* Category Sidebar */}
          <div className="w-80 bg-white bg-opacity-95 backdrop-blur-sm shadow-xl rounded-r-lg pointer-events-auto">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <Grid className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">Shop by Category</h3>
              </div>
              
              <nav className="space-y-1">
                {categories.map((category) => (
                  <div key={category.id} className="relative">
                    <div
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-green-50 transition-colors cursor-pointer group"
                      onMouseEnter={() => setSelectedCategory(category.id)}
                      onMouseLeave={() => setSelectedCategory(null)}
                    >
                      <Link
                        to={`/category/${category.id}`}
                        className="flex-1 text-gray-700 hover:text-green-600 font-medium transition-colors"
                      >
                        {category.name}
                      </Link>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                    </div>
                    
                    {/* Subcategory Dropdown */}
                    {selectedCategory === category.id && (
                      <div className="absolute left-full top-0 ml-2 w-64 bg-white shadow-xl rounded-lg border border-gray-200 p-4 z-20">
                        <h4 className="font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">
                          {category.name}
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          <Link
                            to={`/category/${category.id}`}
                            className="text-sm text-green-600 hover:text-green-700 font-medium py-1 hover:bg-green-50 px-2 rounded transition-colors"
                          >
                            View All {category.name}
                          </Link>
                          {category.subcategories.map((subcategory) => (
                            <Link
                              key={subcategory}
                              to={`/category/${category.id}?subcategory=${encodeURIComponent(subcategory)}`}
                              className="text-sm text-gray-600 hover:text-green-600 py-1 hover:bg-green-50 px-2 rounded transition-colors"
                            >
                              {subcategory}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}