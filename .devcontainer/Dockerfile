FROM node:18-bullseye

# Install basic development tools
RUN apt update && apt install -y less htop bash-completion \
    # Add build essentials and Linux headers for native modules
    build-essential python3 make g++ \
    linux-headers-amd64 libc-dev

# Install global packages
RUN npm install -g @ionic/cli cordova

# Create app directory
WORKDIR /workspace

# Ensure proper Git permissions for the node user
RUN mkdir -p /home/node/.config && chown -R node:node /home/node

# User setup for VSCode
USER node
