FROM node:16.14
WORKDIR /api-wallets
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD [ "node", "dist/main.js" ]