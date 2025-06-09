# Dockerfile
FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source
COPY . .

# Open port
EXPOSE 3002

# Default command
CMD ["npm", "run", "start:dev"]
