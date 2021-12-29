FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000
ENV NODE_ENV = "production"

CMD [ "node", "server.js" ]