import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../types';

interface ProductScrollSectionProps {
  title: string;
  products: Product[];
  categoryId: string;
  maxProducts?: number;
}

const ProductScrollSection: React.FC<ProductScrollSectionProps> = ({
  title,
  products,
  categoryId,
  maxProducts = 10
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const displayProducts = products.slice(0, maxProducts);
  const hasMoreProducts = products.length > maxProducts;

  // Update scroll progress
  const updateScrollProgress = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      setScrollProgress(progress);
    }
  };

  // Handle scrollbar click
  const handleScrollbarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollbarRef.current && scrollContainerRef.current) {
      const rect = scrollbarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const scrollbarWidth = rect.width;
      const scrollRatio = clickX / scrollbarWidth;
      
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const newScrollLeft = scrollRatio * maxScroll;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Handle scrollbar drag start
  const handleScrollbarMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (scrollContainerRef.current) {
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  // Handle scrollbar drag
  const handleScrollbarMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current || !scrollbarRef.current) return;

    e.preventDefault();
    const deltaX = e.clientX - startX;
    const scrollbarWidth = scrollbarRef.current.offsetWidth;
    const scrollContainerWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
    const scrollRatio = deltaX / scrollbarWidth;
    const newScrollLeft = scrollLeft + (scrollRatio * scrollContainerWidth);

    scrollContainerRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, scrollContainerWidth));
  };

  // Handle scrollbar drag end
  const handleScrollbarMouseUp = () => {
    setIsDragging(false);
  };

  // Add event listeners for drag
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && scrollContainerRef.current && scrollbarRef.current) {
        const deltaX = e.clientX - startX;
        const scrollbarWidth = scrollbarRef.current.offsetWidth;
        const scrollContainerWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
        const scrollRatio = deltaX / scrollbarWidth;
        const newScrollLeft = scrollLeft + (scrollRatio * scrollContainerWidth);

        scrollContainerRef.current.scrollLeft = Math.max(0, Math.min(newScrollLeft, scrollContainerWidth));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', updateScrollProgress);
      return () => scrollContainer.removeEventListener('scroll', updateScrollProgress);
    }
  }, []);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-gray-900 mr-4">
            {title}
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full"></div>
        </div>
        <Link
          to={`/category/${categoryId}`}
          className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="relative">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-3 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {displayProducts.map(product => (
            <div key={product.id} className="flex-shrink-0 w-44 md:w-56">
              <ProductCard product={product} />
            </div>
          ))}
          
          {/* "See More" Tile */}
          {hasMoreProducts && (
            <div className="flex-shrink-0 w-44 md:w-56 h-72 bg-gradient-to-br from-green-50 to-yellow-50 border-2 border-dashed border-green-300 rounded-lg flex flex-col items-center justify-center p-4 hover:border-green-400 hover:from-green-100 hover:to-yellow-100 transition-all cursor-pointer group">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                  <ChevronRight className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  See More
                </h3>
                <p className="text-xs text-gray-600 mb-3">
                  Discover {products.length - maxProducts} more products
                </p>
                <Link
                  to={`/category/${categoryId}`}
                  className="inline-block bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors text-sm"
                >
                  View All {title}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Custom Scrollbar */}
        <div className="mt-4">
          <div 
            ref={scrollbarRef}
            className="relative h-3 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleScrollbarClick}
            onMouseDown={handleScrollbarMouseDown}
            onMouseMove={handleScrollbarMouseMove}
            onMouseUp={handleScrollbarMouseUp}
          >
            <div 
              className="absolute top-0 h-full w-8 bg-green-500 rounded-full shadow-md cursor-grab active:cursor-grabbing hover:bg-green-600 transition-colors"
              style={{ 
                left: `calc(${scrollProgress * 100}% - 16px)`,
                transform: 'translateX(0)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductScrollSection; 