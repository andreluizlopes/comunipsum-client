# base image
FROM node:alpine

# set working directory
RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

# start app
CMD ["npm", "start"]
