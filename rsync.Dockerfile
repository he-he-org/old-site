FROM nabeken/docker-volume-container-rsync
RUN mkdir -p /host
ENV VOLUME /var/www/site
VOLUME /var/www/site
