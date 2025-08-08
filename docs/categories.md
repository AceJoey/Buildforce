# Category Management Endpoints

## Overview
Hierarchical category and subcategory management for organizing products. Categories can have multiple subcategories.

## Endpoints

### GET /categories
**Description:** Get all categories with subcategories  
**Access:** Public

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "uuid-string",
        "name": "Power Tools",
        "description": "Professional power tools for construction",
        "subcategories": [
          {
            "id": "uuid-string",
            "name": "Drills",
            "description": "Cordless and corded drills"
          },
          {
            "id": "uuid-string",
            "name": "Saws",
            "description": "Circular saws and jigsaws"
          }
        ]
      },
      {
        "id": "uuid-string",
        "name": "Commercial Equipment",
        "description": "Professional equipment for commercial use",
        "subcategories": [
          {
            "id": "uuid-string",
            "name": "Ice Machines",
            "description": "Commercial ice makers"
          }
        ]
      }
    ]
  }
}
```

### GET /categories/:id
**Description:** Get single category with subcategories  
**Access:** Public

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "category": {
      "id": "uuid-string",
      "name": "Power Tools",
      "description": "Professional power tools for construction",
      "subcategories": [
        {
          "id": "uuid-string",
          "name": "Drills",
          "description": "Cordless and corded drills"
        }
      ]
    }
  }
}
```

### POST /categories
**Description:** Create new category  
**Access:** Private (Admin Required)

**Request Body:**
```json
{
  "name": "New Category",
  "description": "Category description",
  "subcategories": [
    {
      "name": "Subcategory 1",
      "description": "Subcategory description"
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "category": {
      "id": "uuid-string",
      "name": "New Category",
      "description": "Category description",
      "subcategories": [
        {
          "id": "uuid-string",
          "name": "Subcategory 1",
          "description": "Subcategory description"
        }
      ],
      "createdAt": "2024-01-15T00:00:00Z",
      "updatedAt": "2024-01-15T00:00:00Z"
    }
  }
}
```

### PUT /categories/:id
**Description:** Update category  
**Access:** Private (Admin Required)

**Request Body:**
```json
{
  "name": "Updated Category Name",
  "description": "Updated description"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "category": {
      "id": "uuid-string",
      "name": "Updated Category Name",
      "description": "Updated description",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### DELETE /categories/:id
**Description:** Delete category  
**Access:** Private (Admin Required)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

## Usage Examples

```bash
# Get all categories
curl -X GET https://api.buildforce.com/api/v1/categories

# Get specific category
curl -X GET https://api.buildforce.com/api/v1/categories/uuid-string

# Create new category
curl -X POST https://api.buildforce.com/api/v1/categories \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Category",
    "description": "Category description"
  }'

# Update category
curl -X PUT https://api.buildforce.com/api/v1/categories/uuid-string \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Category"
  }'

# Delete category
curl -X DELETE https://api.buildforce.com/api/v1/categories/uuid-string \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
``` 