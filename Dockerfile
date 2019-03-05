FROM node:10.15

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY .env.dist .env
RUN mkdir -p data/ && touch data/chess.db.json

CMD ["npm", "run", "start"]
