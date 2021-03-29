FROM node:14.16.0-alpine

# Create app directory
WORKDIR /usr/src/app

# prequisites
USER 0
COPY package*.json ./
COPY ./config ./config
COPY ./swagger ./swagger
COPY tsconfig*.json ./
COPY ./src ./src
RUN chown -R 1001:0 /usr/src/app/ && npm ci --quiet && npm run build \ 
 && rm -rf ./node_modules ./src ./swagger && rm -f tsconfig.json \ 
 && npm ci --quiet --only=production && rm -f package-lock.json \
USER 1001

CMD ["sh", "-c", "date ; npm start "].