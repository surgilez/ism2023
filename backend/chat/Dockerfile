FROM node:18

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm i && npm run build 

CMD ["npm", "start"]