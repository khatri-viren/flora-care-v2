FROM node:20-slim

WORKDIR /app
COPY . .

RUN npm install

ENV PORT 8080
ENV NODE_ENV production

CMD ["npm", "start"]