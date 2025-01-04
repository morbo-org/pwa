FROM docker.io/node:23.5.0 AS builder

WORKDIR /build/src

RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,target=.,rw \
    npm install && \
    npm run build -- --outDir /build/output

FROM docker.io/nginx:1.27.2-alpine-slim

LABEL org.opencontainers.image.source=https://github.com/morbo-org/Morbo

COPY --from=builder /build/output /usr/share/nginx/html
