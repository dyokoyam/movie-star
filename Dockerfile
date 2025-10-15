# syntax=docker/dockerfile:1.7

ARG NODE_IMAGE=node:20-alpine
ARG GO_IMAGE=golang:1.25-alpine
ARG DISTROLESS_IMAGE=gcr.io/distroless/static-debian12:nonroot

# ---------- Web build ----------
FROM ${NODE_IMAGE} AS web-base
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/

RUN npm ci --include-workspace-root

FROM web-base AS web-build
COPY apps/web ./apps/web
COPY packages ./packages

RUN npm run web:build

FROM web-build AS web-prod-deps
RUN npm prune --omit=dev

FROM ${NODE_IMAGE} AS web-runtime
WORKDIR /app

ENV NODE_ENV=production

COPY --from=web-build /app/apps/web/.next ./apps/web/.next
COPY --from=web-build /app/apps/web/public ./apps/web/public
COPY --from=web-build /app/apps/web/package.json ./apps/web/package.json
COPY --from=web-base /app/package.json ./package.json
COPY --from=web-base /app/package-lock.json ./package-lock.json
COPY --from=web-prod-deps /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start", "--workspace", "@movie-star/web"]

# ---------- API build ----------
FROM ${GO_IMAGE} AS api-base
WORKDIR /app/apps/api

COPY apps/api/go.mod .
COPY apps/api/go.sum .

RUN go mod download

FROM api-base AS api-build
COPY apps/api/ .

RUN CGO_ENABLED=0 GOOS=linux go build -o /bin/server ./cmd/api

FROM ${DISTROLESS_IMAGE} AS api-runtime
USER nonroot:nonroot
WORKDIR /app

COPY --from=api-build /bin/server /bin/server

EXPOSE 8080

ENTRYPOINT ["/bin/server"]
