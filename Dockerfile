# Build stage
FROM node:20-alpine AS build
<<<<<<< Updated upstream
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production serve stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
=======

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

>>>>>>> Stashed changes
CMD ["nginx", "-g", "daemon off;"]
