FROM node:16

# WORK DIR
WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3030

CMD ["node", "dist/bin/server.js"]