FROM node:17-slim AS frontend
RUN mkdir /build
COPY ./src/main/resources/client /build
WORKDIR /build
RUN npm install
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

FROM gradle:alpine AS backend
RUN mkdir /build
COPY . /build
RUN rm -rf /build/main/resources/static
COPY --from=frontend /build/dist /build/src/main/resources/static/
RUN mv /build/src/main/resources/static/index.html /build/src/main/resources/templates/index.html
RUN rm -rf /build/src/main/resources/client
WORKDIR /build
RUN gradle bootJar

FROM openjdk:17-slim
COPY --from=backend /build/build/libs/tea-party-*.jar /app.jar
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar /app.jar"]