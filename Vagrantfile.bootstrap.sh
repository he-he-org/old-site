#!/usr/bin/env bash
locale-gen en_US.UTF-8
LANG=en_US.UTF-8
LANGUAGE=en_US:en
LC_ALL=en_US.UTF-8

# Add missing repositories
add-apt-repository ppa:ondrej/php
apt-get update

# Install apache
apt-get install -y apache2

# Install php
apt-get install -y php5.6 php5.6-mysql php5.6-imagick php5.6-curl php5.6-mbstring

# Install mysql
DEBIAN_FRONTEND=noninteractive apt-get install -y mysql-server

# Usefull apps for development
apt-get install -y git wget curl vim
curl --silent https://bootstrap.pypa.io/get-pip.py |python3 && pip install --upgrade httpie

# Install composer
wget -q https://getcomposer.org/download/1.0.2/composer.phar
chmod a+x composer.phar
mv composer.phar /usr/local/bin/composer

# Install node, npm and gulp
curl -sL https://deb.nodesource.com/setup_6.x | bash -
apt-get install -y nodejs
npm i -g gulp

# Make user with write rights for mounted folders
# useradd -r -g staff -u 1000 docker

# Configure php
phpenmod imagick

# Configure mysql
#usermod -a -G ubuntu mysql
#sed -i 's/user\s*=\s*mysql/user\t=\troot/g' /etc/mysql/mysql.conf.d/mysqld.cnf
#sed -i 's/datadir\s*=\s*\/var\/lib\/mysql/datadir\t=\t\/vagrant\/dbdata/g' /etc/mysql/mysql.conf.d/mysqld.cnf
#
# Configure apache
#sed -i 's/APACHE_RUN_USER=www-data/APACHE_RUN_USER=docker/g' /etc/apache2/envvars
#sed -i 's/APACHE_RUN_GROUP=www-data/APACHE_RUN_GROUP=staff/g' /etc/apache2/envvars

echo '
<VirtualHost *:80>
    ServerName hehe.lc
    DocumentRoot "/vagrant/web"
    <Directory "/vagrant/web">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        RewriteEngine on
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . index.php
    </Directory>
</VirtualHost>' >> /etc/apache2/sites-enabled/hehe.conf
a2enmod rewrite
rm /etc/apache2/sites-enabled/000-default.conf
echo 'ServerName localhost' >> /etc/apache2/apache2.conf
service apache2 restart

# Configure yii
ln -s /vagrant/yii /usr/local/bin/yii

# Configure composer
composer global require "fxp/composer-asset-plugin:~1.1.1"

# Cd to root when open bash
echo "cd /vagrant" >> /home/ubuntu/.bashrc
