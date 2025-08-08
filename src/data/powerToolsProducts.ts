import { EnhancedProduct } from '../types/productSchema';

// Import product images
import circularSaw230 from '../assets/Maxmech 230mm Blade 2400W Circular Saw.png';
import demolitionBreaker from '../assets/1450W jackhamer.png';
import electricPlaner from '../assets/Electric Planer Maxmech EP 500-82 500w.png';
import circularSaw185 from '../assets/Maxmech 185mm Blade 1400W Circular Saw.png';
import rotaryHammer800 from '../assets/Maxmech RH 800-26 26mm  800w Rotary hammer.png';
import rotaryHammer1000 from '../assets/Maxmech RH 1000-28 28mm 1000W Rotary Hammer.png';
import rotaryHammer800D from '../assets/Maxmech RH 800-26D  26mm  800w Rotary Hammer.png';
import benchGrinder450 from '../assets/Maxmech  BG 450-150 450W 6 Inches Bench Grinder.png';
import benchGrinder650 from '../assets/Maxmech  BG 650-205 650W  8 inches Bench Grinder.png';
import planer500 from '../assets/Electric Planer Maxmech EP 500-82 500w.png';
import snowIceMachine from '../assets/Commercial Snow ice machine.png';

export const powerToolsProducts: EnhancedProduct[] = [
  {
    id: 'premier-snow-ice-machine-zx-xbj60',
    name: 'Commercial Snow Ice Machine ZX-XBJ60',
    category: 'Commercial Equipment',
    subcategory: 'Ice Machines',
    price: 92000,
    discountPercentage: 0,
    finalPrice: 92000,
    image: snowIceMachine,
    images: [
      snowIceMachine
    ],
    description: `Professional commercial snow ice machine with 360W power and 240V operation. Perfect for restaurants, bars, cafes, and commercial establishments requiring high-quality snow ice production. Features advanced cooling technology and durable stainless steel construction.

Applications & Areas of Use:
• Restaurants and food service establishments
• Bars and nightclubs
• Cafes and coffee shops
• Hotels and hospitality venues
• Catering services and events
• Commercial kitchens and food preparation areas
• Ice cream shops and dessert parlors
• Mobile food trucks and outdoor events

Maintenance Tips:
• Clean the machine daily after use with mild detergent
• Regularly check and clean the water reservoir
• Inspect the cooling system monthly for optimal performance
• Replace water filters every 3-6 months
• Lubricate moving parts quarterly
• Schedule professional maintenance annually
• Keep the machine in a well-ventilated area
• Monitor temperature settings for consistent ice quality

Usage Guide:
• Ensure proper electrical connection (240V 50Hz)
• Fill water reservoir with clean, filtered water
• Allow machine to pre-cool for 15-20 minutes
• Select appropriate ice production settings
• Monitor ice quality and adjust settings as needed
• Empty and clean collection bin regularly
• Shut down properly after each use
• Store in dry, temperature-controlled environment

Frequently Asked Questions:
Q: How much ice can this machine produce per hour?
A: The ZX-XBJ60 can produce approximately 60kg of snow ice per hour under optimal conditions.

Q: What type of water should I use?
A: Use clean, filtered water for best results. Avoid hard water or water with high mineral content.

Q: How often should I clean the machine?
A: Clean the machine daily after use, with deep cleaning recommended weekly.

Q: Can this machine run continuously?
A: Yes, it's designed for commercial use and can operate continuously with proper maintenance.

Q: What is the warranty period?
A: This machine comes with a 1-year manufacturer warranty covering parts and labor.

#CommercialIceMachine #SnowIceMachine #RestaurantEquipment #BarEquipment #FoodService #CommercialKitchen #IceProduction #PREMIERBrand #ZX-XBJ60 #CommercialAppliances #HospitalityEquipment #FoodAndBeverage`,
    specifications: [
      'Model: ZX-XBJ60',
      'Voltage: 240V 50Hz',
      'Power: 360W',
      'Brand: PREMIER',
      'Made in: China',
      'Dimensions: 540mm H x 485mm W x 290mm D',
      'Weight: 15kg'
    ],
    features: [
      'Commercial-grade snow ice production',
      'Stainless steel construction for durability',
      'Advanced cooling system for consistent ice quality',
      'Easy-to-use control panel with snowflake design',
      'Large water reservoir for continuous operation',
      'Energy-efficient 360W motor',
      'Compact design for commercial spaces',
      'Built-in safety features and overload protection'
    ],
    stock: 8,
    inStock: true,
    isFeatured: true,
    isDeal: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'PRM-SIM-ZX-XBJ60',
    brand: 'PREMIER',
    weight: 15,
    applications: [
      'Restaurants and food service establishments',
      'Bars and nightclubs',
      'Cafes and coffee shops',
      'Hotels and hospitality venues',
      'Catering services and events',
      'Commercial kitchens and food preparation areas',
      'Ice cream shops and dessert parlors',
      'Mobile food trucks and outdoor events'
    ],
    maintenanceTips: [
      'Clean the machine daily after use with mild detergent',
      'Regularly check and clean the water reservoir',
      'Inspect the cooling system monthly for optimal performance',
      'Replace water filters every 3-6 months',
      'Lubricate moving parts quarterly',
      'Schedule professional maintenance annually',
      'Keep the machine in a well-ventilated area',
      'Monitor temperature settings for consistent ice quality'
    ],
    usageGuide: [
      'Ensure proper electrical connection (240V 50Hz)',
      'Fill water reservoir with clean, filtered water',
      'Allow machine to pre-cool for 15-20 minutes',
      'Select appropriate ice production settings',
      'Monitor ice quality and adjust settings as needed',
      'Empty and clean collection bin regularly',
      'Shut down properly after each use',
      'Store in dry, temperature-controlled environment'
    ],
    faqs: [
      {
        question: 'How much ice can this machine produce per hour?',
        answer: 'The ZX-XBJ60 can produce approximately 60kg of snow ice per hour under optimal conditions.'
      },
      {
        question: 'What type of water should I use?',
        answer: 'Use clean, filtered water for best results. Avoid hard water or water with high mineral content.'
      },
      {
        question: 'How often should I clean the machine?',
        answer: 'Clean the machine daily after use, with deep cleaning recommended weekly.'
      },
      {
        question: 'Can this machine run continuously?',
        answer: 'Yes, it\'s designed for commercial use and can operate continuously with proper maintenance.'
      },
      {
        question: 'What is the warranty period?',
        answer: 'This machine comes with a 1-year manufacturer warranty covering parts and labor.'
      }
    ],
    hashtags: [
      '#CommercialIceMachine',
      '#SnowIceMachine',
      '#RestaurantEquipment',
      '#BarEquipment',
      '#FoodService',
      '#CommercialKitchen',
      '#IceProduction',
      '#PREMIERBrand',
      '#ZX-XBJ60',
      '#CommercialAppliances',
      '#HospitalityEquipment',
      '#FoodAndBeverage'
    ]
  },
  {
    id: 'maxmech-planer-500w',
    name: 'Maxmech 500W 82mm Electric Planer',
    category: 'Power Tools',
    subcategory: 'Planers',
    price: 4500,
    discountPercentage: 0,
    finalPrice: 4500,
    image: electricPlaner,
    images: [
      electricPlaner
    ],
    description: 'Professional electric planer with 500W motor and 82mm cutting width. Perfect for woodworking projects, this planer features a depth adjustment system and dust collection port for clean operation. Ideal for carpenters and DIY enthusiasts.',
    specifications: [
      '500W Motor Power',
      '82mm Cutting Width',
      '0-3mm Depth Adjustment',
      'Dust Collection Port',
      'Safety Guard Included',
      'Weight: 3.2kg'
    ],
    features: [
      'High-performance motor for smooth operation',
      'Precise depth adjustment for accurate cuts',
      'Built-in dust collection for clean workspace',
      'Safety guard for operator protection',
      'Ergonomic design for comfortable use',
      'Suitable for both soft and hard woods'
    ],
    stock: 15,
    inStock: true,
    isFeatured: true,
    isDeal: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-PLN-500W-82',
    brand: 'Maxmech',
    weight: 3.2
  },
  {
    id: 'maxmech-rotary-hammer-rh800-26',
    name: 'Maxmech RH 800-26 Rotary Hammer',
    category: 'Power Tools',
    subcategory: 'Drills',
    price: 5650,
    discountPercentage: 0,
    finalPrice: 5650,
    image: rotaryHammer800,
    images: [
      rotaryHammer800
    ],
    description: 'Professional rotary hammer drill with 800W motor and 26mm chuck capacity. Features three operating modes: drilling, hammer drilling, and chiseling. Perfect for concrete, masonry, and heavy-duty construction work.',
    specifications: [
      '800W Motor Power',
      '26mm Chuck Capacity',
      '3 Operating Modes',
      'Anti-Vibration Handle',
      'Depth Stop Included',
      'Weight: 4.8kg'
    ],
    features: [
      'Versatile 3-mode operation',
      'Anti-vibration technology for reduced fatigue',
      'Depth stop for precise drilling',
      'Quick chuck change system',
      'Built-in LED light for visibility',
      'Suitable for concrete and masonry'
    ],
    stock: 12,
    inStock: true,
    isFeatured: false,
    isDeal: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-RH-800-26',
    brand: 'Maxmech',
    weight: 4.8
  },
  {
    id: 'maxmech-rotary-hammer-28mm-1000w',
    name: 'Maxmech 28mm 1000W Rotary Hammer',
    category: 'Power Tools',
    subcategory: 'Drills',
    price: 7150,
    discountPercentage: 0,
    finalPrice: 7150,
    image: rotaryHammer1000,
    images: [
      rotaryHammer1000
    ],
    description: 'Heavy-duty rotary hammer with 1000W motor and 28mm chuck capacity. Designed for professional construction work, this powerful tool handles the toughest drilling tasks in concrete and masonry.',
    specifications: [
      '1000W Motor Power',
      '28mm Chuck Capacity',
      '3 Operating Modes',
      'Anti-Vibration System',
      'Depth Stop & Side Handle',
      'Weight: 5.2kg'
    ],
    features: [
      'High-power motor for demanding applications',
      'Advanced anti-vibration system',
      'Professional-grade construction',
      'Quick mode switching',
      'Ergonomic design for extended use',
      'Includes carrying case'
    ],
    stock: 8,
    inStock: true,
    isFeatured: true,
    isDeal: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-RH-1000W-28',
    brand: 'Maxmech',
    weight: 5.2
  },
  {
    id: 'maxmech-rotary-hammer-rh800-26d',
    name: 'Maxmech RH 800-26D Rotary Hammer',
    category: 'Power Tools',
    subcategory: 'Drills',
    price: 6300,
    discountPercentage: 0,
    finalPrice: 6300,
    image: rotaryHammer800D,
    images: [
      rotaryHammer800D
    ],
    description: 'Professional rotary hammer drill with 800W motor and 26mm chuck capacity. Features dust extraction system and improved ergonomics for enhanced user comfort during extended use.',
    specifications: [
      '800W Motor Power',
      '26mm Chuck Capacity',
      '3 Operating Modes',
      'Dust Extraction System',
      'Anti-Vibration Handle',
      'Weight: 4.9kg'
    ],
    features: [
      'Built-in dust extraction for cleaner work',
      'Enhanced ergonomic design',
      'Three-mode operation system',
      'Quick chuck change mechanism',
      'LED work light for visibility',
      'Professional construction quality'
    ],
    stock: 10,
    inStock: true,
    isFeatured: false,
    isDeal: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-RH-800-26D',
    brand: 'Maxmech',
    weight: 4.9
  },
  {
    id: 'maxmech-demolition-breaker-db1450-30',
    name: 'Demolition Breaker Maxmech DB 1450-30',
    category: 'Power Tools',
    subcategory: 'Drills',
    price: 11500,
    discountPercentage: 0,
    finalPrice: 11500,
    image: demolitionBreaker,
    images: [
      demolitionBreaker
    ],
    description: 'Professional demolition breaker with 1450W motor and 30J impact energy for heavy-duty demolition work. This powerful demolition tool is designed for breaking concrete, asphalt, masonry, and other hard materials. Features advanced anti-vibration technology, ergonomic handle design, and quick chisel change system for maximum efficiency and operator comfort during extended use.',
    specifications: [
      '1450W Motor Power',
      '30J Impact Energy',
      'Anti-Vibration System',
      'Ergonomic Handle Design',
      'Quick Change Chisel System',
      'Weight: 8.5kg',
      'Chisel Diameter: 30mm',
      'Impact Rate: 1500 BPM',
      'Voltage: 220-240V',
      'Frequency: 50Hz'
    ],
    features: [
      'High-impact energy (30J) for efficient demolition of concrete and masonry',
      'Advanced anti-vibration technology reduces operator fatigue',
      'Quick chisel change system for different demolition applications',
      'Ergonomic handle design with rubberized grip for comfort',
      'Professional construction grade for heavy-duty use',
      'Suitable for concrete, asphalt, brick, and stone demolition',
      'Built-in safety features for operator protection',
      'Durable construction for long-term reliability'
    ],
    stock: 5,
    inStock: true,
    isFeatured: true,
    isDeal: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-JH-1450W',
    brand: 'Maxmech',
    weight: 8.5
  },
  {
    id: 'maxmech-circular-saw-185mm-1400w',
    name: 'Maxmech 185mm Blade 1400W Circular Saw',
    category: 'Power Tools',
    subcategory: 'Saws',
    price: 5250,
    discountPercentage: 0,
    finalPrice: 5250,
    image: circularSaw185,
    images: [
      circularSaw185
    ],
    description: 'Professional circular saw with 1400W motor and 185mm blade diameter. Features laser guide, depth adjustment, and dust collection port. Perfect for woodworking and construction projects.',
    specifications: [
      '1400W Motor Power',
      '185mm Blade Diameter',
      'Laser Guide System',
      'Depth Adjustment',
      'Dust Collection Port',
      'Weight: 4.1kg'
    ],
    features: [
      'Laser guide for precise cutting',
      'Adjustable depth for various materials',
      'Built-in dust collection system',
      'Safety guard with automatic retraction',
      'Ergonomic handle design',
      'Suitable for wood and soft materials'
    ],
    stock: 18,
    inStock: true,
    isFeatured: false,
    isDeal: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-CS-185-1400W',
    brand: 'Maxmech',
    weight: 4.1
  },
  {
    id: 'maxmech-circular-saw-230mm-2400w',
    name: 'Maxmech 230mm Blade 2400W Circular Saw',
    category: 'Power Tools',
    subcategory: 'Saws',
    price: 7750,
    discountPercentage: 0,
    finalPrice: 7750,
    image: circularSaw230,
    images: [
      circularSaw230
    ],
    description: 'Heavy-duty circular saw with 2400W motor and 230mm blade diameter. Designed for professional construction work, this powerful saw handles thick materials and demanding cutting tasks.',
    specifications: [
      '2400W Motor Power',
      '230mm Blade Diameter',
      'Laser Guide System',
      'Depth & Bevel Adjustment',
      'Dust Collection Port',
      'Weight: 5.8kg'
    ],
    features: [
      'High-power motor for thick materials',
      'Laser guide for accurate cuts',
      'Bevel adjustment for angled cuts',
      'Professional construction quality',
      'Safety features for operator protection',
      'Suitable for heavy-duty applications'
    ],
    stock: 12,
    inStock: true,
    isFeatured: true,
    isDeal: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-CS-230-2400W',
    brand: 'Maxmech',
    weight: 5.8
  },
  {
    id: 'maxmech-bench-grinder-450w-6inch',
    name: 'Maxmech 450W 6 Inches Bench Grinder',
    category: 'Power Tools',
    subcategory: 'Grinders',
    price: 5000,
    discountPercentage: 0,
    finalPrice: 5000,
    image: benchGrinder450,
    images: [
      benchGrinder450
    ],
    description: 'Professional bench grinder with 450W motor and 6-inch grinding wheels. Perfect for sharpening tools, removing rust, and general metalworking tasks. Features adjustable tool rests and safety guards.',
    specifications: [
      '450W Motor Power',
      '6-inch Grinding Wheels',
      'Adjustable Tool Rests',
      'Safety Guards',
      'Spark Deflectors',
      'Weight: 12.5kg'
    ],
    features: [
      'Dual grinding wheels for different tasks',
      'Adjustable tool rests for precision',
      'Safety guards for operator protection',
      'Spark deflectors for workspace safety',
      'Stable base for secure operation',
      'Suitable for tool sharpening and metalwork'
    ],
    stock: 8,
    inStock: true,
    isFeatured: false,
    isDeal: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-BG-450W-6',
    brand: 'Maxmech',
    weight: 12.5
  },
  {
    id: 'maxmech-bench-grinder-650w-8inch',
    name: 'Maxmech 650W 8 Inches Bench Grinder',
    category: 'Power Tools',
    subcategory: 'Grinders',
    price: 5650,
    discountPercentage: 0,
    finalPrice: 5650,
    image: benchGrinder650,
    images: [
      benchGrinder650
    ],
    description: 'Heavy-duty bench grinder with 650W motor and 8-inch grinding wheels. Designed for professional workshops and industrial applications. Features powerful motor for efficient grinding and polishing tasks.',
    specifications: [
      '650W Motor Power',
      '8-inch Grinding Wheels',
      'Adjustable Tool Rests',
      'Safety Guards',
      'Spark Deflectors',
      'Weight: 18.2kg'
    ],
    features: [
      'High-power motor for demanding applications',
      'Large grinding wheels for efficiency',
      'Professional construction quality',
      'Adjustable tool rests for precision',
      'Comprehensive safety features',
      'Suitable for industrial use'
    ],
    stock: 6,
    inStock: true,
    isFeatured: true,
    isDeal: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    sku: 'MM-BG-650W-8',
    brand: 'Maxmech',
    weight: 18.2
  }
];

// Utility function to get products by subcategory
export const getPowerToolsBySubcategory = (subcategory: string): EnhancedProduct[] => {
  return powerToolsProducts.filter(product => 
    product.subcategory.toLowerCase().replace(' ', '-') === subcategory.toLowerCase().replace(' ', '-')
  );
};

// Utility function to get featured power tools
export const getFeaturedPowerTools = (): EnhancedProduct[] => {
  return powerToolsProducts.filter(product => product.isFeatured);
};

// Utility function to get power tools on deal
export const getPowerToolsOnDeal = (): EnhancedProduct[] => {
  return powerToolsProducts.filter(product => product.isDeal);
}; 