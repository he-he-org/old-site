#!/bin/bash
MUSER="$1"
MPASS="$2"
MDB="hehe"

# Detect paths
MYSQL=$(which mysql)
AWK=$(which awk)
GREP=$(which grep)

$MYSQL -e "drop database $MDB;"
$MYSQL -e "create database $MDB DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;"

yii migrate
