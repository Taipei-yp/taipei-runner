FROM node:14-alpine as builder
RUN mkdir /app
WORKDIR /app
COPY ./* ./
COPY client ./src
COPY ./webpack ./webpack
RUN HUSKY_SKIP_INSTALL=true npm ci --unsafe-perm
RUN npm run build

FROM nginx:1.19.4-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
CMD envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
