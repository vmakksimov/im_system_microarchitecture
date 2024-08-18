# Use an official Node.js image as the base image
FROM node as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
# COPY --from=build /app/dist /usr/share/nginx/html

# # Copy custom Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# # Start Nginx
# CMD ["nginx", "-g", "daemon off;"]
CMD ["npm", "start"]
