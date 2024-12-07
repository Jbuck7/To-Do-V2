# Use an official Node.js image
FROM node:14

# Set working directory to /app
WORKDIR /app

# Copy package*.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Install Vue CLI
RUN npm install -g @vue/cli

# Build the application
RUN npm run build

# Expose port 8080
EXPOSE 8080

# Run command to start the development server
CMD ["npm", "start"]