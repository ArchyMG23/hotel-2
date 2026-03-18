FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev for build)
RUN npm install --include=dev

# Copy source code
COPY . .

# Build the Vite app
RUN npm run build

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_DIR=/data

# Start the server
CMD ["node", "--experimental-strip-types", "server.ts"]
