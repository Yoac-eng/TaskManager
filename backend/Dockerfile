FROM node:16.15.1-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

RUN chmod +x .docker/entrypoint.sh