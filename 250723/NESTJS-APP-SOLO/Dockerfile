# === Stage 1: Build ===
FROM node:22-alpine AS builder

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy source files and build the app
COPY . .
RUN npm run build

# === Stage 2: Production ===
FROM node:22-alpine

# Only copy required files from builder stage
COPY --from=builder /dist ./dist
COPY --from=builder /package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Expose the application port
EXPOSE 3232

# Set environment variable
ENV NODE_ENV=production

# Start the app
CMD ["node", "dist/main"]
