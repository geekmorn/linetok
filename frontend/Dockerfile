FROM node:17-alpine
WORKDIR /frontend
COPY package*.json /frontend

RUN npm i --silent
RUN npm i --location=global react-scripts@5.0.0

CMD [ "npm", "start" ]