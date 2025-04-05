# ---------- Stage 1: Build the React App ----------
    FROM node:18-slim AS builder

    WORKDIR /app
    
    COPY package*.json ./
    RUN npm install
    
    COPY . .
    RUN npm run build
    
    
 # ---------- Stage 2: Use Nginx to Serve the Built App ----------
FROM nginx:alpine

# Copy compiled build artifacts
COPY --from=builder /app/dist /usr/share/nginx/html



EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

    