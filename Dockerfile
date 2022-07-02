FROM node:14.18

WORKDIR /usr/src/app

COPY . .

RUN yarn --omit=dev

EXPOSE 3000

CMD ["node", "server"]
