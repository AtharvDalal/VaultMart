<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
<a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
<a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
<a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# VaultMart

VaultMart  is a scalable e-commerce backend built with NestJS, designed to handle high-performance operations efficiently. It integrates MySQL, Redis, and AWS services for a robust infrastructure, ensuring secure authentication, seamless file uploads, and efficient data management.

## 🚀 Features
- Scalable and modular architecture
- Authentication & Authorization using JWT
- Database integration with MySQL & TypeORM
- Redis caching for improved performance
- File uploading with AWS S3 and Multer
- Request validation using Joi & Zod

## 🛠 Tech Stack
- **Backend:** NestJS (TypeScript, Node.js)
- **Database:** MySQL with TypeORM
- **Cache:** Redis
- **File Storage:** AWS S3, Multer
- **Validation:** Joi, Zod
- **Deployment:** AWS EC2

## 📌 Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- MySQL
- Redis
- AWS S3 bucket (for file uploads)
- Docker (optional for containerized deployment)

### Setup & Run
```sh
# Clone the repository
git clone git@github.com:AtharvDalal/VaultMart.git
cd valuetmart

# Install dependencies
npm install

# Create a .env file and configure your database, Redis, and AWS credentials

# Run migrations (if using TypeORM migrations)
npm run migration:run

# Start the server
npm run start
```

### Docker Setup (Optional)
```sh
# Build and start the container
docker-compose up --build
```

## 📌 API Endpoints
### Authentication Routes

- **Register:** `POST http://localhost:3000/auth/register`
  #### Request:
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
  #### Response:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

- **Login:** `POST http://localhost:3000/auth/login`
  #### Request:
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
  #### Response:
  ```json
  {
    "message": "Login successful",
    "user": {
      "id": 1,
      "username": "testuser",
      "email": "test@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

### Product Routes
- **Create Product:** `POST http://localhost:3000/product/create`
  #### Request:
  ```json
  {
    {
  "name": "Laptop",
  "price": 999.99,
  "description": "A high-end gaming laptop",
  "category": "Electronics",
  "brand": "XYZ Gaming",
  "image_url": "https://my-awesome-bucket.s3.amazonaws.com/products/laptop-image.jpg"
  "color": "Black",
  "quantity": 50,
  "rating": 4.5,
  "weight": "2.5 kg",
  "release_date": "2025-02-01",
  "warranty": "2 years",
  "discount": "10%"
  }
  }


  
  ```
  #### Response:
  ```json
  {
    "message": "Product created successfully",
    "product": {
      {
  "name": "Laptop",
  "price": 999.99,
  "description": "A high-end gaming laptop",
  "category": "Electronics",
  "brand": "XYZ Gaming",
   "image_url": "https://my-awesome-bucket.s3.amazonaws.com/products/laptop-image.jpg"
  "color": "Black",
  "quantity": 50,
  "rating": 4.5,
  "weight": "2.5 kg",
  "release_date": "2025-02-01",
  "warranty": "2 years",
  "discount": "10%"
   }


  
  
  ```

- **Delete Product:** `DELETE http://localhost:3000/product/delete`
- **Update Product:** `PUT http://localhost:3000/product/update`
- **Get All Products:** `GET http://localhost:3000/product/getall`

## 📄 License
This project is licensed under the MIT License.

---

💡 *Feel free to contribute and raise issues in the repository!*
