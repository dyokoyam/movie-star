#!/usr/bin/env bash
set -euo pipefail

pnpm --filter @movie-star/web dev "$@"
