FROM node:20.1.0 as development

WORKDIR /app

COPY package*.json ./
COPY nx.json ./

RUN npm install

COPY . .