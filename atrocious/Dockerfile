FROM ubuntu:latest

ADD _base/open-sesame-1.1.1.tgz /app

RUN apt-get update && \
    apt-get install -y nodejs

WORKDIR /app

ENTRYPOINT [ "node", "/app/index.js" ]