# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# ✅ Fix: Install TypeScript globally
RUN npm install -g typescript

# ✅ Fix: Set permissions for TypeScript
RUN chmod +x /app/node_modules/.bin/tsc

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build
