# Stage 1: Build the application
FROM node:18 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install
RUN npm install -D @tailwindcss/postcss autoprefixer tailwindcss

# Copy configuration files first
COPY postcss.config.js ./
COPY tailwind.config.js ./

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

# Copy the build output from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]