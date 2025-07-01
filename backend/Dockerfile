# Use official Node.js image
FROM node:22-slim

# Set working directory
WORKDIR /app

# Copy only package files first for better layer caching
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of the app
COPY . .

# Set environment variables
ENV PORT=8080
ENV NODE_ENV=production
ENV EMQX_HOST=**REMOVED**.emqxsl.com
ENV EMQX_USERNAME=**REMOVED**
ENV EMQX_PASSWORD=**REMOVED**
ENV FIREBASE_CREDENTIALS='./src/config/admin-sdk.json'
ENV MQTT_TOPIC_PREFIX=prod

# Expose the port (optional but good for documentation)
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
