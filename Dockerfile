# Step 1: Use the official Node.js image as the base
FROM node:24.22.1-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm ci --no-audit --no-fund

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Build the Next.js application (ensure it’s built before starting in production)
RUN npm run build

# Step 7: Expose the port the app will run on
EXPOSE 3000

# Step 8: Start the application in production mode
CMD ["npm", "start"]
