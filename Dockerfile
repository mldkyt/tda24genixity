FROM alpine:3.18.4
RUN apk update
RUN apk add --update nodejs npm
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY postcss.config.js /app/postcss.config.js
COPY tailwind.config.js /app/tailwind.config.js
COPY src /app/src
COPY public /app/public
COPY jsconfig.json /app/jsconfig.json
COPY next.config.js /app/next.config.js
RUN npm install
RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]