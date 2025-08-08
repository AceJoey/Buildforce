import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart, MessageSquare, Check, Star, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import ProductCard from '../components/ProductCard';
import AdminProductEdit from '../components/AdminProductEdit';
import buildforceLogo from '../assets/BUILDFORCE_Lay.png';
import { productDataService } from '../services/productDataService';
import { Product } from '../types';

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAdmin();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  // Load product and related products
  useEffect(() => {
    if (id) {
      const product = productDataService.getProductById(id);
      if (product) {
        setCurrentProduct(product);
        
        // Get related products from the same category
        const allProducts = productDataService.getAllProducts();
        const related = allProducts
          .filter(p => p.category === product.category && p.id !== product.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const product = currentProduct;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link
            to="/"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleVisitLocation = () => {
    navigate('/contact');
    // Scroll to map section after navigation
    setTimeout(() => {
      const mapElement = document.getElementById('map');
      if (mapElement) {
        mapElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);
  };

  const handleProductUpdate = (updatedProduct: Product) => {
    setCurrentProduct(updatedProduct);
    
    // Update related products after product update
    const allProducts = productDataService.getAllProducts();
    const related = allProducts
      .filter(p => p.category === updatedProduct.category && p.id !== updatedProduct.id)
      .slice(0, 4);
    setRelatedProducts(related);
  };

  const handleWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `🛒 *WEBSITE INQUIRY*\n\nHello, I'm interested in this product:\n\n${product.name}\nPrice: KSh ${discountedPrice.toLocaleString()}\nQuantity: ${quantity}\n\nPlease provide more information.`
    );
    window.open(`https://wa.me/254795523752?text=${message}`, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-green-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Admin Product Edit Section */}
        {isLoggedIn && (
          <AdminProductEdit 
            product={product} 
            onProductUpdate={handleProductUpdate}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-3 flex flex-col items-center lg:items-start">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md max-w-xs lg:max-w-sm relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              
              {/* Buildforce Logo Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                <img
                  src={buildforceLogo}
                  alt="Buildforce"
                  className="w-20 h-20 opacity-60"
              />
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 relative ${
                      selectedImage === index ? 'border-green-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Buildforce Logo Overlay for Thumbnails */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
                      <img
                        src={buildforceLogo}
                        alt="Buildforce"
                        className="w-8 h-8 opacity-60"
                    />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <div className="text-sm text-green-600 font-medium mb-1">
                {product.category} • {product.subcategory}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">(24 reviews)</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-2xl lg:text-3xl font-bold text-green-600">
                KSh {discountedPrice.toLocaleString()}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    KSh {product.price.toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-medium">
                    Save {product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className={`font-medium text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="font-medium text-gray-900 text-sm">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 py-1.5 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleWhatsAppQuote}
                  className="flex-1 bg-green-500 text-white px-4 py-2.5 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>Get Quote</span>
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              </div>
              
              <div className="mt-4">
                <button
                  onClick={handleVisitLocation}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-800 px-4 py-2.5 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-colors flex items-center justify-center space-x-2 font-semibold"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Visit Our Location</span>
                </button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-12">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('specifications')}
                className={`py-4 border-b-2 font-medium text-sm ${
                  activeTab === 'specifications'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Specifications
              </button>
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <div 
                  className={`text-gray-700 leading-relaxed whitespace-pre-line ${
                    !isDescriptionExpanded ? 'max-h-32 overflow-hidden' : ''
                  }`}
                  dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }}
                />
                {product.description.length > 200 && (
                  <button
                    onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                    className="mt-4 text-green-600 hover:text-green-700 font-medium flex items-center space-x-1 transition-colors"
                  >
                    <span>{isDescriptionExpanded ? 'Read Less' : 'Read More'}</span>
                    {isDescriptionExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                )}
              </div>
            )}
            {activeTab === 'specifications' && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Technical Specifications:</h4>
                <ul className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex space-x-4 pb-4 min-w-max">
                  {relatedProducts.map(product => (
                    <div key={product.id} className="w-64 flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}