FROM oven/bun:1 AS base
WORKDIR /app

ARG API_URL
ARG VITE_SERVICES_POLLING_INTERVAL=2000 # 2 seconds
ARG VITE_TOPICS_POLLING_INTERVAL=5000 # 5 seconds
ARG VITE_RECORDING_STATE_POLLING_INTERVAL=1000 # 1 seconds

ENV VITE_API_BASE_URL=$API_URL
ENV VITE_SERVICES_POLLING_INTERVAL=$VITE_SERVICES_POLLING_INTERVAL
ENV VITE_TOPICS_POLLING_INTERVAL=$VITE_SERVICES_POLLING_INTERVAL
ENV VITE_RECORDING_STATE_POLLING_INTERVAL=$VITE_SERVICES_POLLING_INTERVAL

FROM base AS install
RUN mkdir -p /temp/build
COPY package.json bun.lockb /temp/build/
RUN cd /temp/build && bun install --frozen-lockfile

FROM base AS candidate
COPY --from=install /temp/build/node_modules node_modules
COPY . .
RUN bun run build

# FROM nginx:alpine
# COPY --from=candidate /app/dist /usr/share/nginx/html
# # COPY nginx.conf /etc/nginx/conf.d/default.conf
#
# # Expose port 80
# EXPOSE 80
#
# # Start Nginx server
# CMD ["nginx", "-g", "daemon off;"]

FROM caddy:alpine

COPY --from=candidate /app/dist /usr/share/caddy
COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
