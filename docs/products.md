# Product Management Endpoints

## Overview
Complete CRUD operations for product management. All endpoints support filtering, pagination, and search functionality.

## Endpoints

### GET /products
**Description:** Get all products with pagination and filtering  
**Access:** Public

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `category` (string): Filter by category
- `subcategory` (string): Filter by subcategory
- `search` (string): Search in product name/description
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `inStock` (boolean): Filter by stock availability

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid-string",
        "name": "Commercial Snow Ice Machine ZX-XBJ60",
        "category": "Commercial Equipment",
        "subcategory": "Ice Machines",
        "price": 92000,
        "discountPercentage": 0,
        "finalPrice": 92000,
        "stock": 8,
        "inStock": true,
        "isFeatured": true,
        "isDeal": false,
        "image": "https://api.buildforce.com/images/snow-machine.jpg",
        "images": ["https://api.buildforce.com/images/snow-machine.jpg"],
        "description": "Professional commercial snow ice machine...",
        "specifications": ["Model: ZX-XBJ60", "Voltage: 240V 50Hz"],
        "features": ["Commercial-grade snow ice production", "Stainless steel construction"],
        "brand": "PREMIER",
        "sku": "PRM-SIM-ZX-XBJ60",
        "weight": 15,
        "createdAt": "2024-01-15T00:00:00Z",
        "updatedAt": "2024-01-15T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

### GET /products/:id
**Description:** Get single product by ID  
**Access:** Public

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "uuid-string",
      "name": "Commercial Snow Ice Machine ZX-XBJ60",
      "category": "Commercial Equipment",
      "subcategory": "Ice Machines",
      "price": 92000,
      "discountPercentage": 0,
      "finalPrice": 92000,
      "stock": 8,
      "inStock": true,
      "isFeatured": true,
      "isDeal": false,
      "image": "https://api.buildforce.com/images/snow-machine.jpg",
      "images": ["https://api.buildforce.com/images/snow-machine.jpg"],
      "description": "Professional commercial snow ice machine...",
      "specifications": ["Model: ZX-XBJ60", "Voltage: 240V 50Hz"],
      "features": ["Commercial-grade snow ice production", "Stainless steel construction"],
      "brand": "PREMIER",
      "sku": "PRM-SIM-ZX-XBJ60",
      "weight": 15,
      "applications": ["Restaurants and food service establishments"],
      "maintenanceTips": ["Clean the machine daily after use"],
      "usageGuide": ["Ensure proper electrical connection"],
      "faqs": [
        {
          "question": "How much ice can this machine produce per hour?",
          "answer": "The ZX-XBJ60 can produce approximately 60kg of snow ice per hour"
        }
      ],
      "hashtags": ["#CommercialIceMachine", "#SnowIceMachine"],
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T00:00:00Z"
    }
  }
}
```

### POST /products
**Description:** Create new product  
**Access:** Private (Admin Required)

**Request Body:**
```json
{
  "name": "New Product Name",
  "category": "Power Tools",
  "subcategory": "Drills",
  "price": 5000,
  "discountPercentage": 10,
  "stock": 25,
  "description": "Product description...",
  "specifications": ["Spec 1", "Spec 2"],
  "features": ["Feature 1", "Feature 2"],
  "brand": "Maxmech",
  "sku": "MM-PROD-001",
  "weight": 5.5,
  "isFeatured": false,
  "isDeal": false
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "uuid-string",
      "name": "New Product Name",
      "category": "Power Tools",
      "subcategory": "Drills",
      "price": 5000,
      "discountPercentage": 10,
      "finalPrice": 4500,
      "stock": 25,
      "inStock": true,
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T00:00:00Z"
    }
  }
}
```

### PUT /products/:id
**Description:** Update existing product  
**Access:** Private (Admin Required)

**Request Body:** (Same structure as POST, all fields optional)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "uuid-string",
      "name": "Updated Product Name",
      "price": 5500,
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### DELETE /products/:id
**Description:** Delete product  
**Access:** Private (Admin Required)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

## Usage Examples

```bash
# Get all products
curl -X GET "https://api.buildforce.com/api/v1/products?page=1&limit=20"

# Get products by category
curl -X GET "https://api.buildforce.com/api/v1/products?category=Power%20Tools"

# Search products
curl -X GET "https://api.buildforce.com/api/v1/products?search=drill"

# Create new product
curl -X POST https://api.buildforce.com/api/v1/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "category": "Power Tools",
    "price": 5000
  }'

# Update product
curl -X PUT https://api.buildforce.com/api/v1/products/uuid-string \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 5500
  }'

# Delete product
curl -X DELETE https://api.buildforce.com/api/v1/products/uuid-string \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
``` 