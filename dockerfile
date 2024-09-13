# Use Node.js as the base image
FROM node:18-alpine as builder

# Set the working directory
WORKDIR /usr/src/app

# Install Yarn
RUN apk add --no-cache yarn

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Start a new stage for a smaller final image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install Yarn
RUN apk add --no-cache yarn

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Copy the built application from the previous stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main"]