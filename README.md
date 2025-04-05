# Anime Catalog – Docker Development Workflow

This repository hosts a React-based “Anime Catalog” application that uses Docker and Docker Compose (with the Watch feature) to create a streamlined development environment with live reload.

---

## Overview

- **Development Environment**:  
  The application runs inside a Docker container. Docker Compose automatically builds the image (if necessary), starts the container, and watches for file changes to trigger live reload or even a full rebuild when needed.

- **Live Reload**:  
  Docker Compose Watch monitors specific directories (for example, the `src/` folder). When you update a file, the changes are synchronized into the container so that the development server (running Vite) triggers hot module replacement—no need to rebuild manually.

- **Automatic Rebuilds**:  
  Critical file changes (such as modifications to `package.json`) trigger an automatic rebuild of the image and restart of the container, ensuring that new dependencies are installed correctly.

---

## Prerequisites

- **Docker Desktop** or Docker Engine must be installed on your system.
- **Docker Compose v2.22.0 or later** is required (the Watch feature is available only in these versions).
- Basic understanding of React, Docker, and Docker Compose.

---

## Project Structure

- **Dockerfile**:  
  Defines the container environment (based on Node 18-slim), installs dependencies, and starts the development server.

- **compose.yaml**:  
  Defines the Docker Compose service, including the watch rules that automatically synchronize file changes (or trigger a rebuild) from your host to the container.

- **src/**:  
  Contains your React application source code.

- **package.json**:  
  Contains project dependencies and scripts (including a dev script that runs Vite on `0.0.0.0:3000`).

---

## Workflow Explanation and Commands

1. **Starting the Development Environment with Watch Mode**  
   - **Command:**  
     ```bash
     docker compose up --watch
     ```
   - **What It Does:**  
     - Docker Compose builds the image automatically if it is not up to date.
     - It starts the defined service (for example, a service named "web") and exposes port 3000.
     - The Watch feature is enabled, so changes in the specified directories (like `src/`) are automatically synchronized into the container.
     - If critical files (e.g., `package.json`) are modified, Docker Compose triggers a rebuild of the image and restarts the container.

2. **Accessing the Application**  
   - Once the container is running, open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see your React app in action.

3. **Hot Reloading and Auto-Sync**  
   - As you edit files in the `src/` directory, Docker Compose Watch syncs those changes to the running container.
   - The development server (powered by Vite) detects these changes and automatically reloads the application, so you immediately see your updates.

4. **Automatic Rebuilds on Critical Changes**  
   - If you modify files like `package.json`, the watch configuration will trigger a full rebuild and restart of the container, ensuring that new or updated dependencies are installed.

5. **Stopping the Environment**  
   - **Command:**  
     ```bash
     docker compose down
     ```
   - **What It Does:**  
     Stops and removes the running containers, cleaning up the development environment.

6. **Viewing Logs and Debugging**  
   - **Command:**  
     ```bash
     docker logs -f <container_name_or_id>
     ```
   - **What It Does:**  
     Streams logs from the running container, which helps in troubleshooting if the app isn’t responding or if errors occur during hot reload.

---

## Notes on Production Builds

For production deployment, a different multi-stage Docker build is used. In production you typically:
- Build a static version of your React app (using `npm run build`).
- Use a lightweight web server (like Nginx) to serve the static files.
- The production image is built and run without the watch feature.
  
