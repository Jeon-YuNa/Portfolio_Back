# Dockerfile
FROM node:18

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install


# Copy app source
COPY . .

# NestJS 앱 빌드
RUN npm run build

# Open port
EXPOSE 3002

# Default command
CMD ["node", "dist/main"]
