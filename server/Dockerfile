FROM node:18-slim

RUN apt-get update && apt-get upgrade -y && apt-get clean

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
