FROM node:14-alpine as build-stage
RUN apk add --no-cache git
WORKDIR /app
COPY package*.json ./
RUN HUSKY_SKIP_INSTALL=true npm install --unsafe-perm
COPY . .
RUN npm run start-prod

FROM nginx:1.19.4-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx.conf.template /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
