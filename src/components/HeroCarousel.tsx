import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productDataService } from '../services/productDataService';
import buildforceLogo from '../assets/BUILDFORCE_Lay.png';

// Import product images
import circularSaw230 from '../assets/Maxmech 230mm Blade 2400W Circular Saw.png';
import demolitionBreaker from '../assets/1450W jackhamer.png';
import electricPlaner from '../assets/Electric Planer Maxmech EP 500-82 500w.png';

// Type for hero slides
type HeroSlide = {
  id: string;
  type: 'featured' | 'product';
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  link: string;
  background: string;
  products?: any[];
  price?: number;
  discountedPrice?: number;
  discountPercentage?: number;
  image?: string;
};

// Helper function to format price as integer with commas
const formatPrice = (price: number): string => {
  return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroProducts, setHeroProducts] = useState<HeroSlide[]>([]);

  useEffect(() => {
    // Get featured products for the hero carousel
    const allProducts = productDataService.getAllProducts();
    const featuredProducts = allProducts.filter(product => product.isFeatured || product.isDeal);
    
    // Create hero slides with compelling messaging
    const heroSlides: HeroSlide[] = [
      {
        id: 'featured-products',
        type: 'featured',
        title: 'Professional Power Tools',
        subtitle: 'Maxmech Quality You Can Trust',
        description: 'Discover our premium range of power tools designed for professionals and DIY enthusiasts',
        buttonText: 'Shop Now',
        link: '/category/power-tools',
        background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
        products: featuredProducts.slice(0, 3)
      }
    ];

    // Get diverse products from the actual product data
    const diverseProducts = allProducts.filter(product => 
      product.id === 'maxmech-circular-saw-230mm-2400w' ||
      product.id === 'maxmech-demolition-breaker-db1450-30' ||
      product.id === 'premier-snow-ice-machine-zx-xbj60'
    );

    // Add individual product slides with diverse products
    diverseProducts.forEach(product => {
      const discountedPrice = Math.round(product.price * (1 - product.discountPercentage / 100));
      heroSlides.push({
        id: product.id,
        type: 'product',
        title: product.name,
        subtitle: `${product.category} • ${product.subcategory}`,
        description: product.description.substring(0, 150) + '...',
        price: product.price,
        discountedPrice: discountedPrice,
        discountPercentage: product.discountPercentage,
        buttonText: 'View Details',
        link: `/product/${product.id}`,
        image: product.image,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)'
      });
    });

    setHeroProducts(heroSlides);
  }, []);

  useEffect(() => {
    if (heroProducts.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
      }, 6000);

      return () => clearInterval(timer);
    }
  }, [heroProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length);
  };

  if (heroProducts.length === 0) {
    return <div className="h-80 md:h-80 lg:h-96 bg-gray-200 rounded-lg animate-pulse" />;
  }

  return (
    <div className="relative h-80 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg -mt-4 md:mt-0 mx-4 md:mx-0">
      {heroProducts.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {slide.type === 'featured' ? (
            // Featured products overview slide
            <div
              className="w-full h-full relative"
              style={{ background: slide.background }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              
              {/* Buildforce Logo */}
              <div className="absolute top-4 right-4 z-10">
                <img
                  src={buildforceLogo}
                  alt="Buildforce"
                  className="w-16 h-16 opacity-80"
                />
              </div>
              
              <div className="absolute inset-0 flex">
                {/* Left side - Text content */}
                <div className="flex-1 flex items-center justify-center p-8">
                  <div className="text-white max-w-md">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      {slide.title}
                </h2>
                    <p className="text-lg md:text-xl font-medium mb-3 text-green-200">
                      {slide.subtitle}
                    </p>
                    <p className="text-sm md:text-base mb-4 text-gray-200">
                      {slide.description}
                </p>
                <Link
                      to={slide.link}
                      className="inline-block bg-yellow-400 hover:bg-yellow-500 text-green-800 font-bold px-6 py-2 rounded-lg transition-colors shadow-lg text-sm md:text-base"
                >
                      {slide.buttonText}
                </Link>
                  </div>
                </div>
                
                {/* Right side - Featured products */}
                <div className="flex-1 flex items-center justify-center p-4">
                  <div className="grid grid-cols-1 gap-4 max-w-xs">
                    {slide.products?.map((product: any, idx: number) => (
                      <div key={product.id} className="bg-white bg-opacity-90 rounded-lg p-3 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-contain rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">
                              {product.name}
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Simple product slide - adaptive image with clickable link and text overlay
            <Link to={slide.link} className="block w-full h-full relative group">
              {/* Background with proper scaling */}
              <div className="w-full h-full relative bg-white">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Gradient overlay for better text visibility */}
                <div 
                  className="absolute inset-0 transition-all duration-300"
                  style={{ background: slide.background }}
                />
                
                {/* Buildforce Logo */}
                <div className="absolute top-4 right-4 z-10">
                  <img
                    src={buildforceLogo}
                    alt="Buildforce"
                    className="w-16 h-16 opacity-90 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  />
                </div>
                
                {/* Text Overlay - Edge to Edge, Shorter Height - Adjusted for mobile */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 md:h-1/3 z-10" style={{ bottom: slide.type === 'product' ? '10px' : '0px' }}>
                  <div className="w-full h-full bg-gradient-to-t from-black/90 via-black/70 to-black/30 backdrop-blur-sm flex items-center">
                    <div className="w-full px-6 md:px-8 text-white">
                      {/* Top Row - Category and Product Title with Rating */}
                      <div className="mb-2">
                        <div className="inline-block bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium mb-2">
                          {slide.subtitle}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg md:text-xl lg:text-2xl font-bold leading-tight flex-1 mr-3">
                            {slide.title}
                          </h3>
                          
                          {/* Star Rating - hidden on mobile for first slide, shown on desktop */}
                          <div className="hidden md:flex items-center space-x-1 flex-shrink-0">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                            <span className="text-gray-200 text-xs ml-1">(4.8)</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price and CTA Button - hidden on mobile for first slide */}
                      <div className="hidden md:flex items-center justify-between">
                        <span className="text-xl md:text-2xl font-bold text-yellow-400">
                          KES {slide.discountedPrice}
                        </span>
                        
                        {/* Call to Action Button */}
                        <div className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg flex items-center space-x-2 group-hover:bg-green-500 text-sm">
                          <span>Explore</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Mobile-only CTA Button for first slide */}
                      <div className="md:hidden flex items-center justify-end">
                        <div className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-lg flex items-center space-x-2 group-hover:bg-green-500 text-sm">
                          <span>Explore</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300" />
          </div>
            </Link>
          )}
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}