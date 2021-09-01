FROM node:14.17.3-alpine

WORKDIR /application

COPY ./package.json ./yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY . .

USER app

CMD ["node", "main.mjs"]