FROM node:18

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . /app

EXPOSE 1337

CMD [ "npm", "run", "server" ]