FROM node:18 as node-builder

ENV VITE_TELEGRAM_APP_NAME=ArgentCon
ENV VITE_TELEGRAM_APP_URL=https://t.me/SatoshiTestENVdev_bot/ArgentCon

RUN npm install -g npm

RUN mkdir /tmp/app
WORKDIR /tmp/app

COPY package.json ./
COPY tsconfig.json ./
COPY index.html ./
COPY tsconfig.app.json ./
COPY vite.config.ts ./
COPY tsconfig.node.json ./
COPY src/ ./src/
COPY public/ ./public/

RUN npm i -g pnpm@8.10.2

RUN pnpm i
RUN pnpm run build

FROM nginx:alpine as nginx

COPY --from=node-builder /tmp/app/dist /usr/share/nginx/html
RUN apk --no-cache add gettext bash

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /tmp/build

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]