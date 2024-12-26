FROM ubuntu:latest
LABEL authors="mlunkeit"

ENTRYPOINT ["top", "-b"]