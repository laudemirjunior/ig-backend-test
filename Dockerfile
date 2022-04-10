# FROM postgres:alpine

# ENV POSTGRES_PASSWORD="1234"

# ENV POSTGRES_DB="ig"

FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]