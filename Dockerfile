FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache make gcc g++ python3

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "init"]