# ── Build stage ───────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

# Copy manifests first (layer-cache friendly)
COPY package.json package-lock.json* ./

# Use npm install — handles any dependency version
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN node_modules/.bin/vite build

# ── Runtime stage — serve with nginx ─────────────────────────
FROM nginx:stable-alpine AS runner

# Copy Vite build output
COPY --from=builder /app/dist /usr/share/nginx/html

# nginx: proxy /api to backend, SPA fallback for React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
