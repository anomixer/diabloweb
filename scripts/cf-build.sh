#!/bin/bash

# Cloudflare Pages build script for DiabloWeb
echo "Starting DiabloWeb build process..."

# Install dependencies
if [ -f "package-lock.json" ]; then
    echo "Found package-lock.json, running npm ci..."
    npm ci --legacy-peer-deps
else
    echo "No package-lock.json found, running npm install..."
    npm install --legacy-peer-deps
fi

# Build the project
echo "Running build..."
npm run build

echo "Build completed successfully!"
