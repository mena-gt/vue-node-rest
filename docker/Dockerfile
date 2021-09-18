FROM node:12.22-alpine3.12

# set work directory
WORKDIR /usr/src/app

# copy the .json files
COPY ./project/package*.json ./

# install dependencies
RUN npm install

# copy project
COPY ./project/ .

ENV NODE_ENV=production

EXPOSE 3000

# run server
CMD [ "node", "src/server.js" ]