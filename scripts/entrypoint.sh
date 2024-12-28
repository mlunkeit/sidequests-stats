#!/bin/bash

# Check if the .next directory doesn't exist
if [ ! -d ".next" ]; then
  echo "No build directory found, rebuilding project..."
  # Run the build process
  npx next build
fi

echo "Starting..."
# Start the next app
npx next start