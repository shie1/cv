FROM node:18.17-alpine3.17
EXPOSE 3000/tcp
LABEL authors="Sonkoly Bence"
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache curl
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --network-timeout 240000
COPY . .
RUN yarn build
HEALTHCHECK CMD curl -I --fail http://localhost:3000 || exit 1
ENTRYPOINT npx next start