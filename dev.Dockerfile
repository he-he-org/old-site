# Simple container for development
#
# To build this Dockerfile:
#
# > docker build -f dev.Dockerfile -t <IMAGE_NAME> .
#
# where:
#  * IMAGE_NAME - name for new image
#
# For example: docker build -f dev.Dockerfile -t hehe.
#
# To run this image:
#
# > docker run -it -p <PORT>:80 -e UID=<UID> -v <PATH>:/var/www/site <IMAGE_NAME>
#
# where:
#  * PATH - path to repository on host machine
#  * PORT - port for Apache on host machine
#  * IMAGE_NAME - image name, used for this Dockerfile when build
#
# For example: docker run -it -p 3000:80 -v $(pwd):/var/www/site hehe

FROM ubuntu:15.04

MAINTAINER Nikolai Mavrenkov <koluch@koluch.ru>

EXPOSE 80

WORKDIR /var/www/site

# Install dependencies
RUN apt-get update && \
    apt-get install -y apache2 php5 git wget php5-imagick curl && \
    apt-get install -y vim httpie # Usefull apps for development

# Install composer
RUN wget https://getcomposer.org/download/1.0.2/composer.phar && \
    chmod a+x composer.phar && \
    mv composer.phar /usr/local/bin/composer

# Install node and npm
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash - && \
    apt-get install -y nodejs

# Configure php
RUN php5enmod imagick

# Configure apache
RUN echo '\
    <VirtualHost *:80>\n\
        ServerName hehe.lc\n\
        DocumentRoot "/var/www/site/web"\n\
        <Directory "/var/www/site/web">\n\
            Options Indexes FollowSymLinks\n\
            AllowOverride All\n\
            Require all granted\n\
        </Directory>\n\
    </VirtualHost>'\
    >> /etc/apache2/sites-enabled/hehe.conf && \
    rm /etc/apache2/sites-enabled/000-default.conf && \
    echo 'ServerName localhost' >> /etc/apache2/apache2.conf && \
    usermod -u 1000 www-data

# Configure composer
RUN composer global require "fxp/composer-asset-plugin:~1.1.1"

# Start apache and run bash
CMD service apache2 start && bash