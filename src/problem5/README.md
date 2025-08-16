# Problem 5 - CRUD Server

A simple CRUD server built with Express, TypeScript, Drizzle ORM, and PostgreSQL.

## Features

- **CRUD Operations**: Create, Read, Update, Delete products
- **Pagination**: Get products with pagination support
- **Filtering**: Filter products by price range, stock quantity, and availability
- **Sorting**: Sort products by different fields (name, price, stock, etc.)
- **Input Validation**: Request validation using Zod schemas
- **Error Handling**: Centralized error handling with custom error types
- **TypeScript**: Full TypeScript support with type safety
- **Database**: PostgreSQL with Drizzle ORM

## Prerequisites

- Node.js (v20 or higher)
- Docker and Docker Compose
- pnpm (recommended) or npm

## Getting Started

### 1. Start the Database

First, start the PostgreSQL database using Docker Compose:

```bash
cd infrastructure/DB
docker-compose up -d
```

This will start a PostgreSQL container with the following default settings:
- Database: `CrudeDB`
- User: `user`
- Password: `password`
- Port: `5432`

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Environment Setup

Create a `.env` file in the project root with your database configuration:

```env
DATABASE_URL=postgres://user:password@localhost:5432/CrudeDB
```

### 4. Database Migration

Push the database schema to PostgreSQL:

```bash
pnpm run db:push
# or
npm run db:push
```

### 5. Start the Development Server

```bash
pnpm run dev
# or
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Products

- **GET** `/api/products/search` - Get all products with pagination and filtering
- **GET** `/api/products/:id` - Get a specific product by ID
- **POST** `/api/products` - Create a new product
- **PUT** `/api/products/:id` - Update a product by ID
- **DELETE** `/api/products/:id` - Delete a product by ID

### Query Parameters for GET `/api/products/search`

- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 10)
- `sortBy` (string): Sort field (default: "id")
- `sortOrder` (string): Sort order - "asc" or "desc" (default: "asc")
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `minStock` (number): Minimum stock filter
- `maxStock` (number): Maximum stock filter
- `inStock` (boolean): Filter by stock availability

## Project Structure

```
src/
├── app.ts                 # Main application entry point
├── config/
│   └── config.ts         # Application configuration
├── constants/
│   ├── errorConstant.ts  # Error message constants
│   └── successConstant.ts # Success message constants
├── controllers/
│   └── productController.ts # Product route handlers
├── database/
│   ├── databaseClient.ts # Database connection
│   └── schema.ts        # Database schema definition
├── errors/
│   ├── canNotAddProductError.ts
│   └── productNotFoundError.ts
├── interfaces/
│   ├── baseError.ts     # Base error interface
│   └── baseResponse.ts  # API response interface
├── middlewares/
│   ├── errorHandler.ts  # Global error handling
│   └── validationMiddleware.ts
├── schemas/
│   └── productSchema.ts # Zod validation schemas
└── services/
    └── productService.ts # Business logic layer
```

## Technologies Used

- **Express**: Web framework for Node.js
- **TypeScript**: Type-safe JavaScript
- **Drizzle ORM**: Type-safe SQL toolkit
- **PostgreSQL**: Relational database
- **Zod**: Schema validation library
- **Docker**: Containerization
- **TSX**: TypeScript execution engine

## Development Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run db:push` - Push database schema changes