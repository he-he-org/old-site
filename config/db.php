<?php
$config = parse_ini_file(__DIR__ . '/../env.ini', true);

return [
    'class' => 'yii\db\Connection',
    'dsn' => @$config['mysql_dsn'] ?: 'mysql:host=localhost;dbname=hehe',
    'username' => @$config['mysql_user'] ?: 'root',
    'password' => @$config['mysql_password'] ?: '',
    'charset' => 'utf8mb4',
];
