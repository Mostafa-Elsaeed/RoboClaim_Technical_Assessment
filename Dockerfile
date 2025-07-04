# CMD ["node", "dist/main.js"]

FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Include dev dependencies needed for migrations
RUN npm ci --legacy-peer-deps

COPY --from=builder /app/dist /app/dist
# Copy migrations if they're not in the dist folder
COPY --from=builder /app/src/database/migrations /app/src/database/migrations
COPY --from=builder /app/src/database/database.config.ts /app/src/database/database.config.ts

USER node

EXPOSE 3000

# Use shell form to allow command chaining
CMD npm run migration:run && node dist/main.js
