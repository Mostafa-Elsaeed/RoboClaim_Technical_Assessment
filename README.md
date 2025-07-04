# NestJS Application

A robust backend application built with NestJS framework that provides authentication, user management, file upload capabilities, and RabbitMQ integration.

## Features

- **Authentication**: Secure user authentication system
- **User Management**: Complete user CRUD operations
- **File Management**: Upload and manage files
- **Message Queue**: RabbitMQ integration for asynchronous processing
- **Configuration Management**: Environment-based configuration with validation
- **Database Integration**: TypeORM for database operations

## Tech Stack

- [NestJS](https://nestjs.com/) - A progressive Node.js framework
- [TypeORM](https://typeorm.io/) - ORM for TypeScript and JavaScript
- [RabbitMQ](https://www.rabbitmq.com/) - Message broker
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

## Project Structure

- `/auth` - Authentication module
- `/users` - User management module
- `/upload` - File upload functionality
- `/file` - File management module
- `/rabbitmq` - RabbitMQ integration module
- `/configs` - Application configuration
- `/database` - Database configuration and connection

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- RabbitMQ server
- Database (based on your TypeORM configuration)

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Environment Configuration
   Create a `.env` file in the root directory with the necessary environment variables according to the validation schema.

4. Start the application

   ```bash
   # development
   npm run start:dev

   # production mode
   npm run build
   npm run start:prod
   ```

## API Documentation

The API documentation can be accessed at `/api/docs` when the application is running (if Swagger is configured).

## Environment Variables

The application uses environment variables for configuration. Check the validation schema in `/configs/env/validation.schema.ts` for required variables.

## ✅ Implemented Features

### 🔐 Authentication

- `POST /auth/signup` – Register new users
- `POST /auth/login` – Login and receive a JWT token
- JWT-based authentication guard protects all routes

---

### 📤 File Upload

- `POST /upload` – Upload one or multiple files
- Supported file types validated (PDF, Images)
- File processing queued via **RabbitMQ**
- Extracted file metadata is stored in the database
- Files are tied to the authenticated user

---

### 🧵 Async Processing

- RabbitMQ is used for asynchronous job queue handling
- Upload tasks are processed in background workers

---

### 📁 File Access

- `GET /files` – Fetch all uploaded files by the current user
- `GET /files/:id` – Fetch details for a specific uploaded file

---

### 📦 Containerization

- Dockerfile for building the service
- `docker-compose.yml` for local orchestration of:
  - App
  - RabbitMQ
  - Database (if included)

---

### 📚 API Documentation

- Swagger/OpenAPI auto-generated documentation available at:

## Missing Components to Implement

The following features were not implemented due to time constraints, but are acknowledged as part of the requirements:

### 📡 Data Streaming

- ❌ Simulating data streaming to local mock HTTP endpoints
- ❌ Logging processed events to file or stdout

### ☁️ Deployment

- ❌ Deployment configuration for a cloud/container service (e.g., AWS, GCP, etc.)
- ❌ Infrastructure as code (Terraform, CDK, etc.)
- ❌ Deployment instructions for CI/CD pipeline or cloud provider

### 🛡️ Security Enhancements

- ❌ Web Application Firewall (WAF) or Cloudflare Gateway integration
- ❌ Rate limiting or IP allowlisting on API routes

### 🔍 Observability

- ❌ Logging strategy beyond basic logging
- ❌ Monitoring or tracing setup (OpenTelemetry, Prometheus, etc.)

### 🧪 Testing

- ❌ Unit and E2E tests for authentication and upload features

## License

## 🧑‍💻 Author

Mostafa Elsaeed
mostafaelsaeed.com

[MIT](LICENSE)
