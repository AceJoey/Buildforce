# Media Management Endpoints

## Overview
Product image upload, update, and deletion functionality. Supports multiple image formats and bulk upload operations.

## Endpoints

### POST /media/upload
**Description:** Upload product image  
**Access:** Private (Admin Required)  
**Content-Type:** `multipart/form-data`

**Request Body:**
- `file`: Image file (jpg, png, webp)
- `productId`: Product ID (optional)
- `altText`: Alt text for image

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "image": {
      "id": "uuid-string",
      "url": "https://api.buildforce.com/images/product-123.jpg",
      "filename": "product-123.jpg",
      "size": 1024000,
      "altText": "Product image",
      "uploadedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### PUT /media/:id
**Description:** Update image metadata  
**Access:** Private (Admin Required)

**Request Body:**
```json
{
  "altText": "Updated alt text",
  "isPrimary": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "image": {
      "id": "uuid-string",
      "url": "https://api.buildforce.com/images/product-123.jpg",
      "altText": "Updated alt text",
      "isPrimary": true,
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

### DELETE /media/:id
**Description:** Delete image  
**Access:** Private (Admin Required)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Image deleted successfully"
}
```

### POST /media/bulk-upload
**Description:** Upload multiple images  
**Access:** Private (Admin Required)

**Request Body:**
- `files`: Array of image files
- `productId`: Product ID

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "uploaded": 3,
    "failed": 0,
    "images": [
      {
        "id": "uuid-string",
        "url": "https://api.buildforce.com/images/product-123-1.jpg",
        "filename": "product-123-1.jpg",
        "size": 1024000
      }
    ]
  }
}
```

### GET /media/:productId
**Description:** Get product images  
**Access:** Public

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "images": [
      {
        "id": "uuid-string",
        "url": "https://api.buildforce.com/images/product-123.jpg",
        "filename": "product-123.jpg",
        "altText": "Product image",
        "isPrimary": true,
        "uploadedAt": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### GET /media/storage-usage
**Description:** Get storage analytics  
**Access:** Private (Admin Required)

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalImages": 150,
    "totalSize": 52428800,
    "averageSize": 349525,
    "storageUsed": "50MB",
    "storageLimit": "1GB"
  }
}
```

## Supported File Types
- **Images:** JPG, JPEG, PNG, WebP
- **Max Size:** 10MB per file
- **Max Dimensions:** 4000x4000 pixels

## Usage Examples

```bash
# Upload single image
curl -X POST https://api.buildforce.com/api/v1/media/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@product-image.jpg" \
  -F "productId=uuid-string" \
  -F "altText=Product image"

# Upload multiple images
curl -X POST https://api.buildforce.com/api/v1/media/bulk-upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "files=@image1.jpg" \
  -F "files=@image2.jpg" \
  -F "productId=uuid-string"

# Update image metadata
curl -X PUT https://api.buildforce.com/api/v1/media/uuid-string \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "altText": "Updated alt text",
    "isPrimary": true
  }'

# Delete image
curl -X DELETE https://api.buildforce.com/api/v1/media/uuid-string \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Get product images
curl -X GET https://api.buildforce.com/api/v1/media/uuid-string

# Get storage usage
curl -X GET https://api.buildforce.com/api/v1/media/storage-usage \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
``` 