FROM node:24-alpine AS builder

WORKDIR /build
COPY . .

RUN npm install
RUN npx prisma generate
RUN npm run build

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
