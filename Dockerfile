# ✅ 1. Use a Node.js base image
FROM node:18-alpine

# ✅ 2. Set working directory
WORKDIR /app

# ✅ 3. Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# ✅ 4. Install TypeScript globally (if using TypeScript)
RUN npm install -g typescript
RUN chmod +x /app/node_modules/.bin/tsc

# ✅ 5. Copy the rest of the project
COPY . .

# ✅ 6. Build the application
RUN npm run build

# ✅ 7. Expose the application port (modify as needed)
EXPOSE 5000

# ✅ 8. Start the application
CMD ["npm", "start"]
