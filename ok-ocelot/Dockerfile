FROM debian:12 AS build
ARG ARCH
ADD node-v22.15.0-linux-${ARCH}.tar.xz /

ENV PATH="/node-v22.15.0-linux-${ARCH}/bin:$PATH"
ADD _base/open-sesame-1.1.4.tgz /app
WORKDIR /app/package
RUN apt-get update && \
    apt-get install -y python3 make g++ && \
    npm rebuild

FROM gcr.io/distroless/nodejs22:nonroot AS final

COPY --from=build /app/package /app/package

USER 1000
WORKDIR /app/package

CMD [ "index.js" ]