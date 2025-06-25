# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy app source
COPY . .

# Build the Next.js app
# RUN npm run build
RUN npx next build --experimental-build-mode compile

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Expose port 3000 (default Next.js port)
EXPOSE 3000

# Start the app in production mode
CMD ["npm", "start"]
# CMD ["node", ".next/standalone/server.js"]
