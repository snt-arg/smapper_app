FROM oven/bun:1 AS base
WORKDIR /app

ARG API_URL=${API_URL}

ENV API_URL=${API_URL}

FROM base AS install
RUN mkdir -p /temp/build
COPY package.json bun.lockb /temp/build/
RUN cd /temp/build && bun install --frozen-lockfile --production

FROM base AS candidate
COPY . .
COPY --from=install /temp/build/node_modules node_modules
RUN bun run build

from nginx:alpine
COPY --from=candidate /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
