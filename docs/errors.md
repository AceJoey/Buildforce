# Error Handling

## Overview
Standardized error responses across all API endpoints. All errors follow a consistent format for easy handling.

## Error Response Format

All error responses follow this structure:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": "Additional error details"
    }
  }
}
```

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 422 | Unprocessable Entity - Validation failed |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## Common Error Codes

### Authentication Errors

#### INVALID_CREDENTIALS
**Status:** 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

#### TOKEN_EXPIRED
**Status:** 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "TOKEN_EXPIRED",
    "message": "JWT token has expired"
  }
}
```

#### INSUFFICIENT_PERMISSIONS
**Status:** 403 Forbidden
```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "You don't have permission to perform this action"
  }
}
```

### Validation Errors

#### VALIDATION_ERROR
**Status:** 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request data",
    "details": {
      "field": "price",
      "message": "Price must be a positive number"
    }
  }
}
```

#### MISSING_REQUIRED_FIELD
**Status:** 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "MISSING_REQUIRED_FIELD",
    "message": "Required field is missing",
    "details": {
      "field": "name",
      "message": "Product name is required"
    }
  }
}
```

### Resource Errors

#### PRODUCT_NOT_FOUND
**Status:** 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 'uuid-string' not found"
  }
}
```

#### CATEGORY_NOT_FOUND
**Status:** 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "CATEGORY_NOT_FOUND",
    "message": "Category with ID 'uuid-string' not found"
  }
}
```

#### IMAGE_NOT_FOUND
**Status:** 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "IMAGE_NOT_FOUND",
    "message": "Image with ID 'uuid-string' not found"
  }
}
```

### File Upload Errors

#### FILE_TOO_LARGE
**Status:** 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds maximum limit of 10MB"
  }
}
```

#### INVALID_FILE_TYPE
**Status:** 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "INVALID_FILE_TYPE",
    "message": "File type not supported. Supported types: JPG, PNG, WebP"
  }
}
```

### Rate Limiting

#### RATE_LIMIT_EXCEEDED
**Status:** 429 Too Many Requests
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Try again in 60 seconds"
  }
}
```

### Server Errors

#### INTERNAL_ERROR
**Status:** 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

#### DATABASE_ERROR
**Status:** 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "DATABASE_ERROR",
    "message": "Database operation failed"
  }
}
```

## Error Handling Best Practices

### Client-Side Handling

```javascript
// Example error handling in JavaScript
async function handleApiRequest() {
  try {
    const response = await fetch('/api/products');
    const data = await response.json();
    
    if (!data.success) {
      // Handle API error
      switch (data.error.code) {
        case 'INVALID_CREDENTIALS':
          // Redirect to login
          break;
        case 'VALIDATION_ERROR':
          // Show validation message
          break;
        case 'PRODUCT_NOT_FOUND':
          // Show 404 page
          break;
        default:
          // Show generic error
      }
    }
  } catch (error) {
    // Handle network errors
    console.error('Network error:', error);
  }
}
```

### Retry Logic

```javascript
// Example retry logic for rate limiting
async function apiRequestWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      if (data.error?.code === 'RATE_LIMIT_EXCEEDED') {
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        continue;
      }
      
      return data;
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}
```

## Testing Error Responses

```bash
# Test authentication error
curl -X POST https://api.buildforce.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "wrong@email.com",
    "password": "wrongpassword"
  }'

# Test validation error
curl -X POST https://api.buildforce.com/api/v1/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "price": -100
  }'

# Test not found error
curl -X GET https://api.buildforce.com/api/v1/products/non-existent-id
``` 