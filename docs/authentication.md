# Authentication Endpoints

## Overview
All private endpoints require JWT authentication. Include the token in the Authorization header for protected routes.

## Endpoints

### POST /auth/login
**Description:** Authenticate admin user and return JWT token  
**Access:** Public

**Request Body:**
```json
{
  "email": "admin@buildforce.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid-string",
      "username": "admin",
      "email": "admin@buildforce.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin",
      "permissions": ["products:read", "products:write", "inventory:manage"],
      "lastLogin": "2024-01-15T10:30:00Z"
    }
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

### GET /auth/me
**Description:** Get current authenticated admin profile  
**Access:** Private (JWT Required)  
**Headers:** `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-string",
      "username": "admin",
      "email": "admin@buildforce.com",
      "firstName": "Admin",
      "lastName": "User",
      "role": "admin",
      "permissions": ["products:read", "products:write", "inventory:manage"],
      "lastLogin": "2024-01-15T10:30:00Z"
    }
  }
}
```

## Usage Example

```bash
# Login to get token
curl -X POST https://api.buildforce.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@buildforce.com",
    "password": "securepassword123"
  }'

# Use token for protected endpoints
curl -X GET https://api.buildforce.com/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
``` 