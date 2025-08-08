# Buildforce E-commerce API Documentation

## Overview
Buildforce E-commerce API provides comprehensive product management, inventory control, and administrative functionality for the Buildforce platform. This API enables real-time product updates, stock management, and category organization.

**Base URL:** `https://api.buildforce.com/api/v1`  
**Authentication:** JWT Bearer Token  
**Content-Type:** `application/json`

## New Features Added (v1.0)
- **Product Management:** Complete CRUD operations for products
- **Category System:** Hierarchical category and subcategory management
- **Inventory Control:** Real-time stock tracking and updates
- **Image Management:** Product image upload, update, and deletion
- **Admin Panel:** Administrative control system for product management
- **Search & Filter:** Advanced product search and filtering capabilities

## Quick Start

### Authentication
```bash
# Login to get JWT token
curl -X POST https://api.buildforce.co.ke/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@buildforce.com",
    "password": "securepassword123"
  }'
```

### Get All Products
```bash
curl -X GET https://api.buildforce.co.ke/api/v1/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Documentation Structure

- [Authentication](./docs/authentication.md) - JWT authentication endpoints
- [Products](./docs/products.md) - Product CRUD operations
- [Categories](./docs/categories.md) - Category management
- [Inventory](./docs/inventory.md) - Stock management
- [Media](./docs/media.md) - Image upload and management
- [Error Handling](./docs/errors.md) - Error responses and codes

