# E-Commerce Server
E-Commerce CMS is a SPA for manage product. This app has : 
* RESTful endpoint for task's CRUD operation
* JSON formatted response

&nbsp;

## User Endpoints
---

## POST /login

> Login user
_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<string>",
  "password": "<string>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<string>",
  "id": <integer>,
  "email": "<string>",
  "role": "<string>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "invalid email or password"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```

## POST /register

> Register user
_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<string>",
  "password": "<string>"
}
```

_Response (200 - OK)_
```
{
  "access_token": "<string>",
  "id": <integer>,
  "email": "<string>",
  "role": "<string>"
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
      "email is required",
      "password is required"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

&nbsp;

## Product Endpoints
---

## POST /products

> Create new product
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": "<string>",
  "image_url": "<string>",
  "price": <string>,
  "stock": <string>
}
```

_Response (201 - Created)_
```
{
  "id": <id by system>,
  "name": "<created name>",
  "image_url": "<created image url>",
  "price": <created price>,
  "stock": <created stock>
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "name is required",
    "image_url is required",
    "price is required",
    "stock is required",
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "authentication failed"
  ]
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "authorization failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

## GET /products

> Get all products
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": <product id>,
    "name": "<product name>",
    "image_url": "<product image url>",
    "price": <product price>,
    "stock": <product stock>
  },
  ...
]
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "authentication failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

## GET /products/:id

> Get product by id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
id: <integer>
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "id": <product id>,
  "name": "<product name>",
  "image_url": "<product image url>",
  "price": <product price>,
  "stock": <product stock>
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "authentication failed"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "product not found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

## PUT /products/:id

> Update product by id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
id: <string>
```

_Request Body_
```
{
  "name": "<string>",
  "image_url": "<string>",
  "price": <integer>,
  "stock": <integer>
}
```

_Response (200 - OK)_
```
{
  "id": <product id>,
  "name": "<updated product name>",
  "image_url": "<updated product image url>",
  "price": <updated product price>,
  "stock": <updated product stock>
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "name is required",
    "image_url is required",
    "price is required",
    "stock is required",
  ]
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "authentication failed"
  ]
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "authorization failed"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "product not found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

## DELETE /products/:id

> Delete product by id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
id: <integer>
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "delete product success"
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "authentication failed"
  ]
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "authorization failed"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "product not found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---
## Product Endpoints
---

## POST /carts

> Create new carts
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "productId": "<integer>",
  "totalItem": "<integer>"
}
```

_Response (201 - Created)_
```
{
  "msg": "success add product to cart",
  "data": {
      "status": false,
      "id": 9,
      "productId": 1,
      "userId": 2,
      "quantity": 3,
      "updatedAt": "2020-10-20T13:45:13.877Z",
      "createdAt": "2020-10-20T13:45:13.877Z"
  }
}
```

_Response (400 - Bad Request)_
```
{
  "errors": [
    "name is required",
    "image_url is required",
    "price is required",
    "stock is required",
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

## GET /carts

> Get all carts
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
  {
    "id": 8,
    "productId": 2,
    "userId": 2,
    "quantity": 669,
    "Product": {
        "id": 2,
        "name": "kaos main",
        ...
    },
    "User": {
        "id": 2,
        "email": "mamad@mail.com",
        ...
    }
  },
  ...
]
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "authentication failed"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

## PUT /carts/:id

> Update carts by id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
id: <string>
```

_Request Body_
```
{
  "quantity": "<integer>"
}
```

_Response (200 - OK)_
```
{
  "cart": [
      1
  ],
  "msg": "success update cart"
}
```

_Response (400 - Bad Request)_
```
{
  "cart": [
      0
  ],
  "msg": "success update cart"
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "authentication failed"
  ]
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "authorization failed"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "product not found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---

## DELETE /carts/:id

> Delete cart by id
_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
id: <integer>
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
{
  "message": "delete product success"
}
```

_Response (401 - Unauthorized)_
```
{
  "errors": [
    "authentication failed"
  ]
}
```

_Response (403 - Forbidden)_
```
{
  "errors": [
    "authorization failed"
  ]
}
```

_Response (404 - Not Found)_
```
{
  "errors": [
    "product not found"
  ]
}
```

_Response (500 - Internal Server Error)_
```
{
  "errors": [
    "internal server error"
  ]
}
```
---