#!/bin/bash

set -e

# Ensure Git can see new files
cd /workspaces/ionic

# Initialize Git if not already initialized
if [ ! -d ".git" ]; then
  echo "Initializing Git repository..."
  git init
fi

# Configure Git to track file mode changes
git config core.fileMode false

# Ensure Git is properly configured
if [ -z "$(git config --get user.email)" ]; then
  echo "Configuring Git user.email and user.name with placeholders."
  echo "You should update these with your actual information using:"
  echo "git config --global user.email \"your.email@example.com\""
  echo "git config --global user.name \"Your Name\""

  git config --global user.email "dev@example.com"
  git config --global user.name "Dev Container User"
fi

# Fix permissions in the workspace
echo "Fixing file permissions..."
find /workspaces/ionic -type d -exec chmod 755 {} \;
find /workspaces/ionic -type f -exec chmod 644 {} \;

# Make scripts executable
find /workspaces/ionic -name "*.sh" -exec chmod +x {} \;

echo "Git setup complete."
