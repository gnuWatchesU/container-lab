FROM ubuntu:latest

ARG ARCH
ADD node-v22.15.0-linux-${ARCH}.tar.xz /

ENV PATH="/node-v22.15.0-linux-${ARCH}/bin:$PATH" 

ADD _base/open-sesame-1.1.4.tgz /app
WORKDIR /app/package

RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    npm rebuild && \
    chown -R 1000:1000 /app

USER 1000

ENTRYPOINT [ "node", "index.js" ]