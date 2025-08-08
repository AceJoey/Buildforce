export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  discountPercentage: number;
  image: string;
  images: string[];
  description: string;
  specifications: string[];
  features: string[];
  inStock: boolean;
  isFeatured: boolean;
  isDeal: boolean;
}

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}