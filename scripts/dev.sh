#!/bin/bash
# Development server script for Spiral CLI

echo "🚀 Starting Spiral CLI development server..."

npm run build
echo "✅ Build complete!"

echo "👀 Starting in watch mode..."
npx tsc --watch &
echo "📡 TypeScript compiler watching for changes"

echo "🎯 Development server ready!"
echo "Press Ctrl+C to stop"

wait
