# Development Dockerfile for PhotoSeller Backend
FROM node:20-alpine

# Install OpenSSL (required by Prisma)
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package*.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

# Generate Prisma client
RUN pnpm run prisma:generate

# Expose port
EXPOSE 8000

# Build app
RUN pnpm run build

# Default command (can be overridden in docker-compose)
CMD ["sh", "-c", "pnpm run prisma:migrate:deploy && pnpm run start:dev"]