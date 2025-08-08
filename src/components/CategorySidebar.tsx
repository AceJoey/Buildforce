import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Grid } from 'lucide-react';
import { categories } from '../data/mockData';

export default function CategorySidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 h-full">
      <div className="flex items-center mb-6">
        <Grid className="w-6 h-6 text-green-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900">Shop by Category</h3>
      </div>
      
      <nav className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="border-b border-gray-100 last:border-b-0">
            <div className="flex items-center justify-between py-3">
              <Link
                to={`/category/${category.id}`}
                className="flex-1 text-gray-700 hover:text-green-600 font-medium transition-colors"
              >
                {category.name}
              </Link>
              <button
                onClick={() => toggleCategory(category.id)}
                className="p-1 text-gray-400 hover:text-green-600 transition-colors"
              >
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {expandedCategories.includes(category.id) && (
              <div className="ml-4 mb-3 space-y-1 bg-gray-50 rounded-lg p-3">
                <Link
                  to={`/category/${category.id}`}
                  className="block text-sm text-green-600 hover:text-green-700 font-medium py-1 transition-colors"
                >
                  View All {category.name}
                </Link>
                {category.subcategories.map((subcategory) => (
                  <Link
                    key={subcategory}
                    to={`/category/${category.id}?subcategory=${encodeURIComponent(subcategory)}`}
                    className="block text-sm text-gray-600 hover:text-green-600 py-1 transition-colors"
                  >
                    {subcategory}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}