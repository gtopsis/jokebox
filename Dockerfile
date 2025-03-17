# Use the official Node.js image as the base image
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy the rest of the application code
COPY . .

# Expose port for development server
EXPOSE 5173

# Run command to start Vite development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
