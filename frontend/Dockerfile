# Base image
FROM node:14 as build

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN npm run build

# Set up the runtime container
FROM node:14

# Set working directory
WORKDIR /app

# Install serve module
RUN npm install -g serve

# Copy from build image
COPY --from=build /app/build .

# Expose port for the app
EXPOSE 3000

# Launch the app
CMD ["serve", "-s", "-l", "3000", "."]
