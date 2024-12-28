FROM node:18-alpine AS base
LABEL authors="mlunkeit"

# Install NodeJS and Node Package Manager
RUN apk add --update --no-cache nodejs npm bash

WORKDIR /app

# Copy everything important
COPY . ./

# Install dependencies using npm
RUN npm install

RUN ls -R /app

# Set the entrypoint to `next run`
ENTRYPOINT ["bash", "scripts/entrypoint.sh"]