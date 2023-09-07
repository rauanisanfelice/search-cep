# syntax=docker/dockerfile:1

FROM node:20-alpine

# development or production
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]
