FROM node:12.2.0-alpine

RUN mkdir -p /onsky/apps
WORKDIR /onsky/apps

#COPY package*.json ./

ADD build build

COPY server.js .
COPY package.deploy.json package.json

RUN yarn install

EXPOSE 8080

CMD ["node", "server.js" ]

