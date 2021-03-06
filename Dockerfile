FROM node:14-alpine as build-stage
ARG DATABASE_URL_PSQL
ARG DATABASE_URL_MONGO
ARG PORT
ENV DATABASE_URL_PSQL $DATABASE_URL_PSQL
ENV DATABASE_URL_MONGO $DATABASE_URL_MONGO 
ENV PORT $PORT
RUN apk add --no-cache git
WORKDIR /app
COPY package*.json ./
RUN HUSKY_SKIP_INSTALL=true npm install --unsafe-perm
COPY . .
CMD ["npm","run","start-prod"]


