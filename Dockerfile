FROM node:10.15

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.dist .env

CMD ["npm", "run", "start"]
