#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

echo "[delivery-check] Running type checks..."
pnpm check:type

echo "[delivery-check] Running production build..."
pnpm check:build

echo "[delivery-check] Completed successfully."
