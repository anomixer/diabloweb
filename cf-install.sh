#!/bin/bash

# Cloudflare Pages build script
echo "Starting Cloudflare Pages build process..."

# Install dependencies with legacy peer deps flag
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Run the build
echo "Building the project..."
npm run build

echo "Build completed successfully!"
