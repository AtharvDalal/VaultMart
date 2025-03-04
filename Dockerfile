FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY src ./src


RUN npm run build

EXPOSE 3000


CMD ["node", "dist/main.js"]
