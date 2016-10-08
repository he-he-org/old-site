# Simple container for development
#
# To build this Dockerfile:
#
# > docker build -f dev.Dockerfile -t <IMAGE_NAME> .
#
# where:
#  * IMAGE_NAME - name for new image
#
# For example: docker build -f dev.Dockerfile -t hehe .
#
# To run this image:
#
# > docker run -it -p <PORT>:80 -v <REPO_PATH>:/var/www/site <IMAGE_NAME>
#
# where:
#  * REPO_PATH - path to repository on host machine
#  * PORT - port for Apache on host machine
#  * IMAGE_NAME - image name, used for this Dockerfile when build
#
# For example: docker run -it -p 3000:3000 -p 8080:80 -v $(pwd):/var/www/site hehe

FROM ubuntu:15.04

MAINTAINER Nikolai Mavrenkov <koluch@koluch.ru>

EXPOSE 80

RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

WORKDIR /var/www/site

# Install dependencies
RUN apt-get update && \
    apt-get install -y apache2 php5 php5-mysql php5-imagick php5-curl && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server && \
    apt-get install -y git wget curl vim httpie # Usefull apps for development

# Install composer
RUN wget https://getcomposer.org/download/1.0.2/composer.phar && \
    chmod a+x composer.phar && \
    mv composer.phar /usr/local/bin/composer

# Install node, npm and gulp
RUN curl -sL https://deb.nodesource.com/setup_5.x | bash - && \
    apt-get install -y nodejs && \
    npm i -g gulp

# Make user with write rights for mounted folders
RUN useradd -r -g staff -u 1000 docker

# Configure php
RUN php5enmod imagick

# Configure mysql
RUN sed -i 's/user\s*=\s*mysql/user\t=\troot/g' /etc/mysql/mysql.conf.d/mysqld.cnf && \
    sed -i 's/datadir\s*=\s*\/var\/lib\/mysql/datadir\t=\t\/var\/www\/site\/dbdata/g' /etc/mysql/mysql.conf.d/mysqld.cnf

# Configure apache
RUN sed -i 's/APACHE_RUN_USER=www-data/APACHE_RUN_USER=docker/g' /etc/apache2/envvars && \
    sed -i 's/APACHE_RUN_GROUP=www-data/APACHE_RUN_GROUP=staff/g' /etc/apache2/envvars && \
    echo '\
    <VirtualHost *:80>\n\
        ServerName hehe.lc\n\
        DocumentRoot "/var/www/site/web"\n\
        <Directory "/var/www/site/web">\n\
            Options Indexes FollowSymLinks\n\
            AllowOverride All\n\
            Require all granted\n\
            RewriteEngine on\n\
            RewriteCond %{REQUEST_FILENAME} !-f\n\
            RewriteCond %{REQUEST_FILENAME} !-d\n\
            RewriteRule . index.php\n\
        </Directory>\n\
    </VirtualHost>'\
    >> /etc/apache2/sites-enabled/hehe.conf && \
    a2enmod rewrite && \
    rm /etc/apache2/sites-enabled/000-default.conf && \
    echo 'ServerName localhost' >> /etc/apache2/apache2.conf

# Confiture yii
RUN ln -s /var/www/site/yii /usr/local/bin/yii

# Configure composer
RUN composer global require "fxp/composer-asset-plugin:~1.1.1"



# Start apache, initialize mysql directory and run bash
CMD service apache2 start && \
    bash -c 'if [[ ! -e /var/www/site/dbdata ]]; then echo "### Initialize db ###" && \
        mkdir /var/www/site/dbdata; \
        mysql_install_db; \
        mysqld_safe & \
        while ! mysqladmin status >/dev/null 2>&1 ; do \
            echo "Wait for mysql..."; \
            sleep 1; \
        done && \
        echo "create database hehe DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;" | mysql; \
    else \
        mysqld_safe & \
    fi' && \
    tail -f /dev/null
