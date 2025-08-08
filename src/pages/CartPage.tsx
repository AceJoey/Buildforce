import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const handleWhatsAppCheckout = () => {
    const itemsList = items.map(item => {
      const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
      return `${item.product.name} - Qty: ${item.quantity} - KSh ${(discountedPrice * item.quantity).toLocaleString()}`;
    }).join('\n');

    const message = encodeURIComponent(
      `🛒 *WEBSITE ORDER*\n\nHello, I would like to place an order:\n\n${itemsList}\n\nTotal: KSh ${getTotalPrice().toLocaleString()}\n\nPlease confirm availability and delivery details.`
    );
    window.open(`https://wa.me/254795523752?text=${message}`, '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some tools and machinery to get started</p>
            <Link
              to="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
              return (
                <div key={item.product.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Product Image */}
                    <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-24 h-24 object-contain rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-600 mt-1">{item.product.category}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className="text-lg font-bold text-green-600">
                          KSh {discountedPrice.toLocaleString()}
                        </span>
                        {item.product.discountPercentage > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            KSh {item.product.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">
                        KSh {(discountedPrice * item.quantity).toLocaleString()}
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700 mt-2 flex items-center space-x-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">KSh {getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-sm text-green-600">Calculated at checkout</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-green-600">
                      KSh {getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>Order via WhatsApp</span>
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Cart
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <Link
                  to="/"
                  className="text-green-600 hover:text-green-700 font-medium flex items-center"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}