import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { categories } from '../data/mockData';

const CategorySelector: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true;
    if (path !== '/' && currentPath.includes(path)) return true;
    return false;
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm fixed md:sticky top-20 z-40">
      <div className="container mx-auto px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 py-3 min-w-max">
            <Link
              to="/"
              className={`flex-shrink-0 px-2 py-1 text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-black border-b-2 border-green-600' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              ALL
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className={`flex-shrink-0 px-2 py-1 text-sm font-medium transition-colors ${
                  isActive(`/category/${category.id}`)
                    ? 'text-black border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector; 