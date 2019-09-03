FROM node:10.16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent
COPY . /app
RUN npm run build




FROM httpd:alpine

USER root

#Custom changes
RUN apk update && apk upgrade
RUN apk -q add curl vim libcap

RUN adduser -s /bin/sh -u 1001 -G root -S -D default && \
chown -R 1001:0 $HTTPD_PREFIX && \
chmod -R g+rw $HTTPD_PREFIX/logs
#setcap to bind to privileged ports as non-root
COPY httpd.conf $HTTPD_PREFIX/conf
RUN setcap 'cap_net_bind_service=+ep' $HTTPD_PREFIX/bin/httpd
RUN getcap $HTTPD_PREFIX/bin/httpd

#COPY --from=build-stage /app/build/ /usr/local/apache2/htdocs/
COPY --from=build /app/build/ /usr/local/apache2/htdocs/

EXPOSE 80
USER 1001