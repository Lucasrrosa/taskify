FROM node:22-alpine AS build

# Working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the application code
COPY . .

# Build the application
RUN yarn build

# Production Stage
FROM node:22-alpine AS production

# Working directory inside the container
WORKDIR /app
COPY . .

# Start the application
CMD ["sh", "-c", "yarn m:run && yarn start:prod"]