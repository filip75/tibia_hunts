FROM node:13-slim as builder

WORKDIR /app
COPY frontend/package.json frontend/yarn.lock /app/
RUN yarn
COPY frontend/public /app/public
COPY frontend/src /app/src

RUN yarn build


FROM nginx:1.17

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder /app/build /var/www/html/

ENTRYPOINT ["nginx", "-g", "daemon off;"]