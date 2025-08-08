# Inventory Management Endpoints

## Overview
Real-time stock tracking and inventory management for products. Track stock levels, low stock alerts, and stock adjustments.

## Endpoints

### GET /inventory/:productId
**Description:** Get product stock information  
**Access:** Private (Admin Required)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "productId": "uuid-string",
    "currentStock": 8,
    "reservedStock": 2,
    "availableStock": 6,
    "lowStockThreshold": 5,
    "lastUpdated": "2024-01-15T10:30:00Z"
  }
}
```

### PUT /inventory/:productId
**Description:** Update product stock  
**Access:** Private (Admin Required)

**Request Body:**
```json
{
  "stock": 15,
  "reason": "Restock from supplier"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "productId": "uuid-string",
    "previousStock": 8,
    "newStock": 15,
    "change": 7,
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

### POST /inventory/bulk-update
**Description:** Bulk update multiple products' stock  
**Access:** Private (Admin Required)

**Request Body:**
```json
{
  "updates": [
    {
      "productId": "uuid-string",
      "stock": 20
    },
    {
      "productId": "uuid-string",
      "stock": 15
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "updated": 2,
    "failed": 0,
    "results": [
      {
        "productId": "uuid-string",
        "previousStock": 8,
        "newStock": 20,
        "success": true
      }
    ]
  }
}
```

### GET /inventory/low-stock
**Description:** Get products with low stock  
**Access:** Private (Admin Required)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid-string",
        "name": "Product Name",
        "currentStock": 3,
        "lowStockThreshold": 5
      }
    ]
  }
}
```

### GET /inventory/out-of-stock
**Description:** Get out-of-stock products  
**Access:** Private (Admin Required)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "uuid-string",
        "name": "Product Name",
        "currentStock": 0,
        "lastRestock": "2024-01-10T00:00:00Z"
      }
    ]
  }
}
```

### GET /inventory/analytics
**Description:** Get inventory analytics  
**Access:** Private (Admin Required)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalProducts": 150,
    "inStock": 120,
    "lowStock": 15,
    "outOfStock": 15,
    "totalValue": 2500000,
    "averageStockLevel": 12.5
  }
}
```

## Usage Examples

```bash
# Get product stock
curl -X GET https://api.buildforce.com/api/v1/inventory/uuid-string \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update stock
curl -X PUT https://api.buildforce.com/api/v1/inventory/uuid-string \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 15,
    "reason": "Restock from supplier"
  }'

# Bulk update stock
curl -X POST https://api.buildforce.com/api/v1/inventory/bulk-update \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "updates": [
      {
        "productId": "uuid-string",
        "stock": 20
      }
    ]
  }'

# Get low stock products
curl -X GET https://api.buildforce.com/api/v1/inventory/low-stock \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get inventory analytics
curl -X GET https://api.buildforce.com/api/v1/inventory/analytics \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
``` 