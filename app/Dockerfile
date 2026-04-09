FROM node:20-alpine
WORKDIR /opt/app
COPY package.json package-lock.json* ./
RUN npm ci --production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
