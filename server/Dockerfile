FROM node:12.10.0

ENV YARN_VERSION 1.17.3

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN npm i -g prisma

RUN yarn

COPY . .

EXPOSE 4000

CMD yarn start