# Use an official node image as the base image
FROM node

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

# Install serve to serve the app
# RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 5173
CMD ["npm", "run", "dev"]
# Start the application using serve
# CMD ["serve", "-s", "dist", "-l", "5173"]
