import React, { useState, useRef } from 'react';
import { Edit, Save, X, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';
import { useAdmin } from '../context/AdminContext';
import { productDataService } from '../services/productDataService';
import { EnhancedProduct } from '../types/productSchema';

// Helper function to format price as integer with commas
const formatPrice = (price: number): string => {
  return Math.round(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

interface AdminProductEditProps {
  product: Product;
  onProductUpdate: (updatedProduct: Product) => void;
}

export default function AdminProductEdit({ product, onProductUpdate }: AdminProductEditProps) {
  const { isLoggedIn } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Calculate the selling price from the current product data
  const getSellingPrice = (product: Product) => {
    if (product.discountPercentage === 0) return product.price;
    return Math.round(product.price * (1 - product.discountPercentage / 100));
  };

  const [editForm, setEditForm] = useState({
    name: product.name,
    sellingPrice: getSellingPrice(product), // Store selling price (what customers pay)
    category: product.category,
    subcategory: product.subcategory,
    description: product.description,
    specifications: product.specifications.join('\n'),
    features: product.features.join('\n'),
    discountPercentage: product.discountPercentage,
    images: [...product.images] // Copy images array
  });

  // Calculate original price based on selling price and discount percentage
  const calculateOriginalPrice = (sellingPrice: number, discountPercentage: number) => {
    if (discountPercentage === 0) return sellingPrice;
    return Math.round(sellingPrice / (1 - discountPercentage / 100));
  };

  // Calculate original price for display
  const originalPrice = calculateOriginalPrice(editForm.sellingPrice, editForm.discountPercentage);

  if (!isLoggedIn) {
    return null;
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'sellingPrice' || name === 'discountPercentage' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      const newImages: string[] = [];
      
      for (const file of Array.from(files)) {
        // Save image to assets using the service
        const imageUrl = await productDataService.saveImageToAssets(file);
        newImages.push(imageUrl);
      }

      setEditForm(prev => ({
        ...prev,
        images: [...prev.images, ...newImages]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = editForm.images[index];
    
    try {
      // Remove image from assets using the service
      await productDataService.removeImageFromAssets(imageToRemove);
      
      setEditForm(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } catch (error) {
      console.error('Error removing image:', error);
      // Still remove from UI even if server removal fails
      setEditForm(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAddImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Convert Product to EnhancedProduct for the service
      const enhancedProduct: EnhancedProduct = {
        id: product.id,
        name: editForm.name,
        category: editForm.category,
        subcategory: editForm.subcategory,
        price: originalPrice, // Store the original price
        discountPercentage: editForm.discountPercentage,
        finalPrice: editForm.sellingPrice, // The selling price is the final price
        image: editForm.images[0] || product.image, // First image is main image
        images: editForm.images,
        description: editForm.description,
        specifications: editForm.specifications.split('\n').filter(spec => spec.trim()),
        features: editForm.features.split('\n').filter(feature => feature.trim()),
        stock: 10, // Default stock value
        inStock: product.inStock,
        isFeatured: product.isFeatured,
        isDeal: product.isDeal,
        createdAt: new Date(), // Default creation date
        updatedAt: new Date(),
        sku: `SKU-${product.id}`, // Generate SKU from product ID
        brand: 'Maxmech', // Default brand
        weight: 0 // Default weight
      };

      // Save to database using the service
      const success = await productDataService.updateProduct(enhancedProduct);
      
      if (success) {
        // Update the local product state
        const updatedProduct: Product = {
          ...product,
          name: editForm.name,
          price: originalPrice,
          category: editForm.category,
          subcategory: editForm.subcategory,
          description: editForm.description,
          specifications: editForm.specifications.split('\n').filter(spec => spec.trim()),
          features: editForm.features.split('\n').filter(feature => feature.trim()),
          discountPercentage: editForm.discountPercentage,
          images: editForm.images
        };

        onProductUpdate(updatedProduct);
        setIsEditing(false);
        alert('Product updated successfully and saved to database!');
      } else {
        alert('Failed to save product. Please try again.');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditForm({
      name: product.name,
      sellingPrice: getSellingPrice(product),
      category: product.category,
      subcategory: product.subcategory,
      description: product.description,
      specifications: product.specifications.join('\n'),
      features: product.features.join('\n'),
      discountPercentage: product.discountPercentage,
      images: [...product.images]
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-yellow-800 flex items-center">
          <Edit className="w-5 h-5 mr-2" />
          Admin Product Editor
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Product</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selling Price (KES) - What customers pay
              </label>
              <input
                type="number"
                name="sellingPrice"
                value={editForm.sellingPrice}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subcategory
              </label>
              <input
                type="text"
                name="subcategory"
                value={editForm.subcategory}
                onChange={handleEditChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Percentage
              </label>
              <input
                type="number"
                name="discountPercentage"
                value={editForm.discountPercentage}
                onChange={handleEditChange}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price (Calculated)
              </label>
              <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                KES {formatPrice(originalPrice)}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Original price before discount
              </p>
            </div>
          </div>

          {/* Product Images Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Product Images
            </label>
            <div className="space-y-4">
              {/* Current Images */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {editForm.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-24 object-contain border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* Add Image Button */}
                <button
                  onClick={handleAddImageClick}
                  className="w-full h-24 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-yellow-500 hover:text-yellow-500 transition-colors"
                >
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-xs">Add Image</span>
                </button>
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <p className="text-xs text-gray-500">
                Upload images to showcase your product. First image will be the main product image.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={editForm.description}
              onChange={handleEditChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specifications (one per line)
            </label>
            <textarea
              name="specifications"
              value={editForm.specifications}
              onChange={handleEditChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter specifications, one per line..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Features (one per line)
            </label>
            <textarea
              name="features"
              value={editForm.features}
              onChange={handleEditChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Enter features, one per line..."
            />
          </div>

          {/* Price Preview */}
          {editForm.discountPercentage > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">Price Preview</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Original Price:</span>
                  <span className="text-gray-500 line-through">KES {formatPrice(originalPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="text-red-600 font-medium">{editForm.discountPercentage}% OFF</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Selling Price:</span>
                  <span className="text-green-600 font-bold text-lg">KES {formatPrice(editForm.sellingPrice)}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium flex items-center space-x-2 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-medium rounded-md transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm text-yellow-700">
          Click "Edit Product" to modify product details. Changes will be saved to the database.
        </div>
      )}
    </div>
  );
} 