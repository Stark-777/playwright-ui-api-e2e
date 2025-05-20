# Use official Node base image
FROM mcr.microsoft.com/devcontainers/javascript-node:20

# Install necessary dependencies for Playwright
RUN apt-get update && apt-get install -y wget curl ca-certificates gnupg && \
    apt-get clean
