// Enhanced Product Schema for Database Preparation
// This schema builds upon existing categories and subcategories

export interface EnhancedProduct {
  // Core Product Information
  id: string;
  name: string;
  category: string;
  subcategory: string;
  
  // Pricing Information
  price: number;
  discountPercentage: number;
  finalPrice: number; // Calculated field
  
  // Media
  image: string;
  images: string[];
  
  // Description & Details
  description: string;
  specifications: string[];
  features: string[];
  
  // Inventory & Status
  stock: number;
  inStock: boolean;
  isFeatured: boolean;
  isDeal: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  sku?: string;
  brand?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  
  // Additional Product Information
  applications?: string[];
  maintenanceTips?: string[];
  usageGuide?: string[];
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  hashtags?: string[];
}

export interface CategorySchema {
  id: string;
  name: string;
  subcategories: SubcategorySchema[];
  description?: string;
  image?: string;
}

export interface SubcategorySchema {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

// Current Categories and Subcategories Structure
export const CATEGORY_SCHEMA: CategorySchema[] = [
  {
    id: 'power-tools',
    name: 'Power Tools',
    description: 'Professional power tools for construction and DIY projects',
    subcategories: [
      { id: 'drills', name: 'Drills', description: 'Cordless and corded drills for various applications' },
      { id: 'saws', name: 'Saws', description: 'Circular saws, jigsaws, and reciprocating saws' },
      { id: 'grinders', name: 'Grinders', description: 'Angle grinders and bench grinders' },
      { id: 'sanders', name: 'Sanders', description: 'Orbital sanders, belt sanders, and detail sanders' },
      { id: 'planers', name: 'Planers', description: 'Electric planers for woodworking' }
    ]
  },
  {
    id: 'hand-tools',
    name: 'Hand Tools',
    description: 'Traditional hand tools for precision work',
    subcategories: [
      { id: 'hammers', name: 'Hammers', description: 'Claw hammers, ball peen hammers, and mallets' },
      { id: 'screwdrivers', name: 'Screwdrivers', description: 'Phillips, flathead, and specialty screwdrivers' },
      { id: 'wrenches', name: 'Wrenches', description: 'Adjustable wrenches, socket sets, and combination wrenches' },
      { id: 'pliers', name: 'Pliers', description: 'Needle nose, cutting, and locking pliers' },
      { id: 'measuring-tools', name: 'Measuring Tools', description: 'Tape measures, levels, and squares' }
    ]
  },
  {
    id: 'machinery',
    name: 'Machinery',
    description: 'Heavy duty machinery for industrial applications',
    subcategories: [
      { id: 'generators', name: 'Generators', description: 'Portable and standby generators' },
      { id: 'compressors', name: 'Compressors', description: 'Air compressors for pneumatic tools' },
      { id: 'welding-equipment', name: 'Welding Equipment', description: 'Arc welders, MIG welders, and accessories' },
      { id: 'lifting-equipment', name: 'Lifting Equipment', description: 'Hoists, cranes, and lifting accessories' }
    ]
  },
  {
    id: 'safety-equipment',
    name: 'Safety Equipment',
    description: 'Personal protective equipment for workplace safety',
    subcategories: [
      { id: 'helmets', name: 'Helmets', description: 'Hard hats and safety helmets' },
      { id: 'gloves', name: 'Gloves', description: 'Work gloves for various applications' },
      { id: 'safety-boots', name: 'Safety Boots', description: 'Steel toe and composite toe boots' },
      { id: 'protective-clothing', name: 'Protective Clothing', description: 'High visibility vests and safety clothing' }
    ]
  },
  {
    id: 'building-materials',
    name: 'Building Materials',
    description: 'Construction materials and supplies',
    subcategories: [
      { id: 'cement', name: 'Cement', description: 'Portland cement and concrete mixes' },
      { id: 'steel', name: 'Steel', description: 'Rebar, steel beams, and structural steel' },
      { id: 'timber', name: 'Timber', description: 'Lumber, plywood, and engineered wood products' },
      { id: 'roofing-materials', name: 'Roofing Materials', description: 'Shingles, tiles, and roofing accessories' }
    ]
  },
  {
    id: 'commercial-equipment',
    name: 'Commercial Equipment',
    description: 'Professional equipment for commercial and industrial use',
    subcategories: [
      { id: 'ice-machines', name: 'Ice Machines', description: 'Commercial ice makers and snow ice machines' },
      { id: 'refrigeration', name: 'Refrigeration', description: 'Commercial refrigerators and freezers' },
      { id: 'cooking-equipment', name: 'Cooking Equipment', description: 'Commercial ovens, grills, and cooking appliances' },
      { id: 'food-processing', name: 'Food Processing', description: 'Food processing and preparation equipment' }
    ]
  }
];

// Utility Functions for Database Operations
export const getCategoryById = (id: string): CategorySchema | undefined => {
  return CATEGORY_SCHEMA.find(category => category.id === id);
};

export const getSubcategoryById = (categoryId: string, subcategoryId: string): SubcategorySchema | undefined => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
};

export const getAllSubcategories = (): SubcategorySchema[] => {
  return CATEGORY_SCHEMA.flatMap(category => category.subcategories);
};

export const calculateFinalPrice = (price: number, discountPercentage: number): number => {
  return price - (price * discountPercentage / 100);
};

// Database-ready product creation helper
export const createProduct = (productData: Omit<EnhancedProduct, 'id' | 'finalPrice' | 'createdAt' | 'updatedAt'>): EnhancedProduct => {
  const now = new Date();
  return {
    ...productData,
    id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    finalPrice: calculateFinalPrice(productData.price, productData.discountPercentage),
    createdAt: now,
    updatedAt: now
  };
};

// Search and filter utilities
export const filterProductsByCategory = (products: EnhancedProduct[], categoryId: string): EnhancedProduct[] => {
  return products.filter(product => product.category.toLowerCase().replace(' ', '-') === categoryId);
};

export const filterProductsBySubcategory = (products: EnhancedProduct[], subcategory: string): EnhancedProduct[] => {
  return products.filter(product => product.subcategory.toLowerCase().replace(' ', '-') === subcategory);
};

export const searchProducts = (products: EnhancedProduct[], query: string): EnhancedProduct[] => {
  const searchTerm = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.subcategory.toLowerCase().includes(searchTerm)
  );
}; 