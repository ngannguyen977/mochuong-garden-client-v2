FROM node:8.11.3-alpine

#RUN apk add --no-cache curl
#RUN apk add --no-cache bash

#ENTRYPOINT ["/usr/bin/curl"]

#RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


RUN apk update && apk add curl python g++ make && rm -rf /var/cache/apk/*


COPY package*.json ./

COPY . .

RUN yarn install
RUN yarn build


EXPOSE 8080 

CMD ["node", "server.js" ]

