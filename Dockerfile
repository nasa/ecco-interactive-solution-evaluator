FROM node:16

RUN mkdir -p /ecco/
COPY . /ecco/
WORKDIR /ecco/

RUN npm install

EXPOSE 8080
CMD npm start