# --- Stage 1: Build with Vite ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install && npm rebuild esbuild

COPY . .
RUN npm run build  # outputs to /app/dist by default


# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]