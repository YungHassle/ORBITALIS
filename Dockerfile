FROM node:latest
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY . .
RUN yarn install --network-timeout 100000
RUN yarn build
CMD ["yarn", "start"]
