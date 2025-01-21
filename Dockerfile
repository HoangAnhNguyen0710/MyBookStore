# Use the official Node.js 20 image as the base image
FROM node:20-alpine

# Create and set the working directory
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml files to the working directory
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application files to the working directory
COPY . .

# Set environment variables from the .env file
COPY .env.docker.local .env

# Build the Next.js application
RUN pnpm build

# Expose the port that the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]