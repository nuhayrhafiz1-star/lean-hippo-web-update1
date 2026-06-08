#!/usr/bin/env bash
# ============================================================
# Lean Hippo — push the static build to your Hostinger VPS.
# Run from the `website/` directory on YOUR machine:
#     VPS_USER=root VPS_HOST=YOUR.VPS.IP ./deploy/deploy-vps.sh
#
# It builds the site and rsyncs out/ to /var/www/leanhippo/out on the VPS.
# Requires: node/npm locally, ssh access, rsync.
# ============================================================
set -euo pipefail

VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:?Set VPS_HOST to your VPS IP or hostname}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/leanhippo/out}"

echo "==> Building static export…"
npm ci
npm run build

echo "==> Ensuring remote dir exists…"
ssh "${VPS_USER}@${VPS_HOST}" "mkdir -p ${REMOTE_DIR}"

echo "==> Syncing out/ -> ${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}"
rsync -az --delete out/ "${VPS_USER}@${VPS_HOST}:${REMOTE_DIR}/"

echo "==> Reloading nginx…"
ssh "${VPS_USER}@${VPS_HOST}" "sudo nginx -t && sudo systemctl reload nginx"

echo "==> Done. Visit https://leanhippo.io"
