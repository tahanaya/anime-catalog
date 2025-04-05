# Stage 1: Build the application
FROM node:18-slim 

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies (this will install both development and production dependencies)
RUN npm install

# Copy the source code into the container
COPY . .

# Run the build command (creates a production build of the app)
RUN npm run build



# Expose the React development port (3000) for hot-reloading
EXPOSE 3000

# Run the React app in development mode
CMD ["npm", "run", "dev"]
