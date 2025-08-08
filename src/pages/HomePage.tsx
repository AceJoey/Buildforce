import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';
import CategorySidebar from '../components/CategorySidebar';
import ProductScrollSection from '../components/ProductScrollSection';
import ProductCard from '../components/ProductCard';
import { products } from '../data/mockData';

export default function HomePage() {
  const dealsOfTheDay = products.filter(product => product.isDeal);
  const featuredProducts = products.filter(product => product.isFeatured);
  
  // Filter products by category
  const powerTools = products.filter(product => product.category === 'Power Tools');
  const commercialEquipment = products.filter(product => product.category === 'Commercial Equipment');

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-0 md:py-8">
        <div className="space-y-8">
          {/* Hero Section with Category Sidebar - Desktop Only */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <CategorySidebar />
            </div>
            
            {/* Hero Carousel */}
            <div className="lg:col-span-3">
              <HeroCarousel />
            </div>
          </div>

          {/* Hero Section - Mobile Only */}
          <div className="lg:hidden w-full">
            <HeroCarousel />
          </div>

          {/* Flash Sale Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-3xl font-bold text-gray-900 mr-4">
                  Flash Sale!
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full"></div>
              </div>
              <Link
                to="/deals"
                className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span>View All Deals</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
              {dealsOfTheDay.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Power Tools Section */}
          <ProductScrollSection
            title="Power Tools"
            products={powerTools}
            categoryId="power-tools"
            maxProducts={10}
          />

          {/* Commercial Equipment Section */}
          <ProductScrollSection
            title="Commercial Equipment"
            products={commercialEquipment}
            categoryId="commercial-equipment"
            maxProducts={10}
          />

          {/* Featured Products */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <h2 className="text-3xl font-bold text-gray-900 mr-4">
                  Featured Products
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full"></div>
              </div>
              <Link
                to="/featured"
                className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 bg-green-50 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors"
              >
                <span>View All Featured</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
              {featuredProducts.slice(0, 8).map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Category Highlights */}
          <section>
            <div className="flex items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mr-4">
                Shop by Category
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-yellow-400 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/category/power-tools"
                className="relative h-48 bg-gradient-to-r from-green-600 to-green-700 rounded-lg overflow-hidden group shadow-lg"
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
                <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-700 rounded-full"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-xl font-bold mb-2">Power Tools</h3>
                    <p className="text-sm">Professional grade tools</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}