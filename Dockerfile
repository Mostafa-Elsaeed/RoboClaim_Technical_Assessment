FROM node:18-alpine as builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy-peer-deps flag to bypass peer dependency issues
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies with legacy-peer-deps flag
RUN npm ci --only=production --legacy-peer-deps

# Copy built application from builder stage
COPY --from=builder /app/dist /app/dist

# Create startup script to start the app and ensure it's accessible
RUN echo '#!/bin/sh\nnode dist/main.js' >/app/startup.sh &&
    chmod +x /app/startup.sh &&
    chown -R node:node /app

# Use non-root user for better security
USER node

# Expose the port your app runs on
EXPOSE 3000

# Run the application directly instead of using the script
CMD ["node", "dist/main.js"]
