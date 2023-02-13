FROM node:18-alpine

WORKDIR /nodejs2022Q4-service

COPY package*.json .

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]