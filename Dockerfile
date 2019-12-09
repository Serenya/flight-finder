FROM node:12.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY ./src .

EXPOSE 8080

CMD [ "node", "hosts/express/bin/www" ]