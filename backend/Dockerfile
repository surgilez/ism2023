FROM node:18

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm ci

CMD ["npm", "start"]

