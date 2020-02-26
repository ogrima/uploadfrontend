FROM node:lts-slim

RUN mkdir -p /usr/src/app

ENV DIST=/usr/src/app

ADD . ${DIST}/

WORKDIR ${DIST}

RUN npm install && \
    npm run build && \
    npm install -g serve && \
    rm -rf ${DIST}/src

EXPOSE 5000

CMD ["serve", "-s", "build"]