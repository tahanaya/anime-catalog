# ---------- Stage 1: Build the React App ----------
    FROM node:18-slim AS builder

    # Set working directory inside the container
    WORKDIR /app
    
    # Copy only package files first (for efficient caching)
    COPY package*.json ./
    
    # Install dependencies
    RUN npm install
    
    # Copy all source code
    COPY . .
    
    # Build the React app
    RUN npm run build
    
    
    # ---------- Stage 2: Use Nginx to Serve the Built App ----------
    FROM nginx:alpine
    
    # Copy compiled build artifacts from the 'builder' stage
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Expose port 80 (default HTTP port for Nginx)
    EXPOSE 80
    
    # Command to run Nginx in the foreground (daemon off)
    CMD ["nginx", "-g", "daemon off;"]
    