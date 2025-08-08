import { powerToolsProducts } from './powerToolsProducts';
import { productDataService } from '../services/productDataService';

// Get products from the service instead of static array
export const products = productDataService.getAllProducts();

// Categories structure
export const categories = [
  {
    id: 'power-tools',
    name: 'Power Tools',
    subcategories: ['Drills', 'Saws', 'Grinders', 'Planers']
  },
  {
    id: 'commercial-equipment',
    name: 'Commercial Equipment',
    subcategories: ['Ice Machines', 'Refrigeration', 'Cooking Equipment', 'Food Processing']
  }
];

// Deals
export const deals = [
  {
    id: 'maxmech-power-tools-deal',
    title: 'Maxmech Power Tools Sale',
    description: 'Get up to 20% off on selected Maxmech power tools. Professional quality at affordable prices.',
    image: '', // Removed image reference for now
    link: '/category/power-tools'
  }
];