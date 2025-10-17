# syntax=docker/dockerfile:1.7
FROM node:20-alpine
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages ./packages
RUN pnpm install

COPY . .
CMD ["pnpm", "--filter", "@movie-star/web", "dev", "--host", "0.0.0.0"]
