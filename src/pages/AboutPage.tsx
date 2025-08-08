import React from 'react';
import { Shield, Award, Users, Wrench } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-green-600">Buildforce</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner in professional tools and machinery for over a decade. 
            We provide quality equipment that powers Kenya's construction and industrial sectors.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-green-800" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">5,000+</h3>
            <p className="text-gray-600">Products Available</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-800" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600">Quality Guaranteed</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2010, Buildforce started as a small family business with a simple mission: 
              to provide Kenya's builders, contractors, and DIY enthusiasts with access to high-quality 
              tools and machinery at competitive prices.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we've grown from a single storefront in Nairobi to become one of Kenya's 
              most trusted suppliers of professional tools and industrial equipment. Our success is built 
              on three pillars: quality products, exceptional service, and competitive pricing.
            </p>
            <p className="text-gray-600">
              Today, we serve thousands of customers across Kenya, from individual craftsmen to large 
              construction companies, always maintaining our commitment to excellence and customer satisfaction.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5691660/pexels-photo-5691660.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Professional tools"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-green-600 to-yellow-400 rounded-lg opacity-20"></div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We source only the highest quality tools and machinery from trusted manufacturers, 
                ensuring our customers get reliable equipment that lasts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We provide expert advice, 
                competitive pricing, and exceptional after-sales support.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve our product range and services to meet the changing needs 
                of Kenya's construction and industrial sectors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}