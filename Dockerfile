FROM node:18 as node-builder

ENV VITE_TELEGRAM_APP_NAME=ArgentCon
ENV VITE_TELEGRAM_APP_URL=https://t.me/SatoshiTestENVdev_bot/ArgentCon
ENV VITE_RPC_URL=https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/Ua6UIZkJ1gNmt3-vojnhRddToypP2z50
ENV VITE_ADMIN_PRIVATE_KEY=0x078c3e3ba9930852a98a64c810fb07de768549ed49f15326e8429e8de508d8f8
ENV VITE_ADMIN_ADDRESS=0x001228928b53b8a46F8377160D5E0d886C23BabD914B6C9652caFeCA1f285e9d

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