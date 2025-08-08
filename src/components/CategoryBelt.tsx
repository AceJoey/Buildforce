import React from 'react';
import { Link } from 'react-router-dom';

const CategoryBelt: React.FC = () => {
  const categories = [
    { id: 'all', name: 'ALL', path: '/' },
    { id: 'power-tools', name: 'Power Tools', path: '/category/power-tools' },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm md:hidden">
      <div className="container mx-auto px-4 overflow-x-auto">
        <div className="flex items-center space-x-2 py-1 scrollbar-hide overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className="flex-shrink-0 px-3 py-1.5 bg-white hover:bg-green-600 hover:text-white text-gray-700 rounded-full text-xs font-medium transition-all duration-200 border border-gray-200 hover:border-green-600 shadow-sm whitespace-nowrap"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBelt;