FROM node:13-slim

WORKDIR /app
COPY frontend/package.json frontend/yarn.lock /app/
RUN yarn
COPY /frontend/src /app/src
COPY /frontend/public /app/public

CMD ["yarn", "start"]