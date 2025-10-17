# Movie Star Monorepo

Next.js App Router + Gin + PostgreSQL monorepo skeleton for the Movie Star premium video platform.

## Project Layout
```
movie-star/
������ apps/
��   ������ api/                # Gin service
��   ������ web/                # Next.js frontend
������ packages/               # Shared TypeScript workspaces
������ pkg/                    # Shared Go libraries
������ configs/                # Central tooling configs
������ infrastructure/         # Docker, IaC, deployment helpers
������ scripts/                # Dev utility scripts
������ .github/workflows/      # CI/CD pipelines
```

## Getting Started
```bash
# Install pnpm once
npm install -g pnpm

# Install dependencies
pnpm install

# Start frontend
pnpm --filter @movie-star/web dev

# Start API
cd apps/api && go run ./cmd/server
```

## Tooling
- Go 1.25+
- Node.js 20+, pnpm 9+
- PostgreSQL 16
- Docker (optional for local stack)

## Next Steps
1. Flesh out domain logic inside `apps/api/internal` and `apps/web/src/features`.
2. Configure shared lint/test/build pipelines per package requirements.
3. Add automated deployment steps in `.github/workflows/deploy.yml`.
