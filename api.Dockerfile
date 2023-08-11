# Start base image build
FROM node:18.12.1-alpine as admin-api

# Set working directory
WORKDIR /app

# Copy api source code
COPY api /app/api
COPY prisma /app/prisma
COPY server.js /app/server.js

# Install api dependencies only
RUN npm init -y
RUN npm install express \
    cors \
    dotenv \
    bcrypt \
    jsonwebtoken \
    cookie \
    prisma \
    @prisma/client

# Generate prisma client
RUN npx prisma generate

# Expose port 3002
EXPOSE 3002

# Run server
CMD ["node", "server.js"]
