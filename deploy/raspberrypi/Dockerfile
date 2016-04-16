FROM resin/raspberrypi-node:latest

RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get install -y unzip

ADD https://github.com/HackerLoop/rotonde-datadog/archive/master.zip /tmp/
RUN unzip /tmp/master.zip -d /usr/local/ && mv /usr/local/rotonde-datadog-master /usr/local/rotonde-datadog

WORKDIR "/usr/local/rotonde-datadog/"

RUN npm install

RUN apt-get autoremove -y unzip && \
    apt-get purge

CMD ["/usr/local/bin/node", "--harmony-destructuring", "index.js"]
