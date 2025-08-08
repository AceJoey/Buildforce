import { EnhancedProduct } from '../types/productSchema';
import { powerToolsProducts } from '../data/powerToolsProducts';

// Interface for data operations
export interface ProductDataService {
  getAllProducts(): EnhancedProduct[];
  getProductById(id: string): EnhancedProduct | undefined;
  updateProduct(updatedProduct: EnhancedProduct): Promise<boolean>;
  addProduct(product: Omit<EnhancedProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean>;
  deleteProduct(id: string): Promise<boolean>;
  saveImageToAssets(file: File): Promise<string>;
  removeImageFromAssets(imagePath: string): Promise<boolean>;
  refreshFromSource(): void;
}

// Implementation of the product data service
export class ProductDataServiceImpl implements ProductDataService {
  private products: EnhancedProduct[] = [...powerToolsProducts];

  getAllProducts(): EnhancedProduct[] {
    return this.products;
  }

  getProductById(id: string): EnhancedProduct | undefined {
    return this.products.find(product => product.id === id);
  }

  async updateProduct(updatedProduct: EnhancedProduct): Promise<boolean> {
    try {
      const index = this.products.findIndex(product => product.id === updatedProduct.id);
      if (index === -1) {
        throw new Error(`Product with id ${updatedProduct.id} not found`);
      }

      // Update the product with new timestamp
      const productToUpdate = {
        ...updatedProduct,
        updatedAt: new Date()
      };

      this.products[index] = productToUpdate;

      // In a real application, this would save to a database or file system
      // For now, we'll simulate the save operation
      await this.saveToDatabase();
      
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  }

  async addProduct(product: Omit<EnhancedProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> {
    try {
      const newProduct: EnhancedProduct = {
        ...product,
        id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.products.push(newProduct);
      await this.saveToDatabase();
      
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) {
        throw new Error(`Product with id ${id} not found`);
      }

      this.products.splice(index, 1);
      await this.saveToDatabase();
      
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  }

  async saveImageToAssets(file: File): Promise<string> {
    try {
      // In a real application, this would upload to a server or cloud storage
      // For now, we'll create a local URL and simulate the upload
      const imageUrl = URL.createObjectURL(file);
      
      // Generate a unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substr(2, 9);
      const fileExtension = file.name.split('.').pop();
      const filename = `product_${timestamp}_${randomString}.${fileExtension}`;
      
      // In a real app, you would upload to your server here
      // const uploadedUrl = await uploadToServer(file, filename);
      
      // For now, return the local URL
      return imageUrl;
    } catch (error) {
      console.error('Error saving image:', error);
      throw new Error('Failed to save image');
    }
  }

  async removeImageFromAssets(imagePath: string): Promise<boolean> {
    try {
      // In a real application, this would delete from server or cloud storage
      // For now, we'll just revoke the object URL if it's a blob URL
      if (imagePath.startsWith('blob:')) {
        URL.revokeObjectURL(imagePath);
      }
      
      return true;
    } catch (error) {
      console.error('Error removing image:', error);
      return false;
    }
  }

  private async saveToDatabase(): Promise<void> {
    // In a real application, this would save to a database or file system
    // For now, we'll simulate the save operation
    console.log('Saving products to database...', this.products.length, 'products');
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // In a real app, you might:
    // - Save to a JSON file
    // - Update a database
    // - Send to an API
    // - Update localStorage for persistence
    
    // For demonstration, we'll update localStorage
    localStorage.setItem('buildforce_products', JSON.stringify(this.products));
  }

  // Method to load products from localStorage on app startup
  loadFromStorage(): void {
    try {
      const stored = localStorage.getItem('buildforce_products');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.products = parsed.map((product: any) => ({
          ...product,
          createdAt: new Date(product.createdAt),
          updatedAt: new Date(product.updatedAt)
        }));
      } else {
        // If no stored data, use the current powerToolsProducts
        this.products = [...powerToolsProducts];
      }
    } catch (error) {
      console.error('Error loading products from storage:', error);
      // Fallback to original data
      this.products = [...powerToolsProducts];
    }
  }

  // Method to force refresh products from source data
  refreshFromSource(): void {
    this.products = [...powerToolsProducts];
    localStorage.removeItem('buildforce_products');
    console.log('Products refreshed from source:', this.products.length, 'products');
  }
}

// Create and export a singleton instance
export const productDataService = new ProductDataServiceImpl();

// Initialize the service with stored data
productDataService.loadFromStorage();

// Force refresh to include new products
productDataService.refreshFromSource(); 