FROM postgres:14-alpine

ENV POSTGRES_PASSWORD browni3s
ENV POSTGRES_DB postgres
ENV POSTGRES_USER postgres
COPY init.sql /docker-entrypoint-initdb.d/
