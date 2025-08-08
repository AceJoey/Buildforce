import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import buildforceLogo from '../assets/BUILDFORCE_Lay.png';

// Helper function to format price as integer with commas
const formatPrice = (price: number): string => {
  return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group w-full h-56 md:h-72 flex flex-col">
      <Link to={`/product/${product.id}`} className="block flex-1">
        <div className="relative overflow-hidden h-24 md:h-32">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Buildforce Logo Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300">
            <img
              src={buildforceLogo}
              alt="Buildforce"
              className="w-12 h-12 md:w-16 md:h-16 opacity-80 group-hover:opacity-60 transition-opacity duration-300"
            />
          </div>
          
          {product.discountPercentage > 0 && (
            <div className="absolute top-1 left-1 md:top-2 md:left-2 bg-red-500 text-white px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-xs font-medium z-10">
              {product.discountPercentage}% OFF
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
              <span className="text-white font-medium text-sm">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-2 md:p-3 flex-1 flex flex-col">
          <h3 className="font-medium text-gray-900 text-xs md:text-sm mb-1 md:mb-2 line-clamp-2 flex-1">
            {product.name}
          </h3>
          
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-green-600 text-sm md:text-base">
                KSh {formatPrice(discountedPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-gray-500 line-through text-xs md:text-sm">
                  KSh {formatPrice(product.price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      
      <div className="p-2 md:p-3 pt-0">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full bg-green-600 hover:bg-green-700 text-white text-xs md:text-sm font-medium py-1.5 md:py-2 px-3 md:px-4 rounded transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-1 md:space-x-2"
        >
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}