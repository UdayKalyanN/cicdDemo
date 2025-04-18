#!/usr/bin/env bash
set -euo pipefail

# where your manifests repo is checked out
MANIFESTS_DIR="$WORKSPACE/../ci-cd-manifests"
cd "$MANIFESTS_DIR"

# Configure Git (so Jenkins can commit)
git config user.email "udaykalyannuthalapati1999@gmail.com"
git config user.name  "UdayKalyanN"

# Bump backend image tag
sed -i \
  -e "s|image: udaykalyannuthalapati/demo-backend:.*|image: udaykalyannuthalapati/demo-backend:${BUILD_NUMBER}|g" \
  backend-deployment.yaml

# Bump frontend image tag
sed -i \
  -e "s|image: udaykalyannuthalapati/demo-frontend:.*|image: udaykalyannuthalapati/demo-frontend:${BUILD_NUMBER}|g" \
  frontend-deployment.yaml

git add backend-deployment.yaml frontend-deployment.yaml
git commit -m "chore: bump images → ${BUILD_NUMBER}"
git push origin main
