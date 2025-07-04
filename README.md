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

## License

[MIT](LICENSE)
