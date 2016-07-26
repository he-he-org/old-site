<?php

namespace app\models;


class User extends \yii\base\Object implements \yii\web\IdentityInterface
{
    static $ADMIN_PASSWORD;
    static $ADMIN_ACCESS_TOKEN;

    public $id;
    public $username;
    public $password;
    public $authKey;
    public $accessToken;

    private static function getUsers() {
        return [
            '100' => [
                'id' => '100',
                'username' => 'admin',
                'password' => self::$ADMIN_PASSWORD,
                'accessToken' => self::$ADMIN_ACCESS_TOKEN,
                'authKey' => bin2hex(openssl_random_pseudo_bytes(16)),
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public static function findIdentity($id)
    {
        return isset(self::getUsers()[$id]) ? new static(self::getUsers()[$id]) : null;
    }

    /**
     * @inheritdoc
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        foreach (self::getUsers() as $user) {
            if ($user['accessToken'] === $token) {
                return new static($user);
            }
        }

        return null;
    }

    /**
     * Finds user by username
     *
     * @param  string      $username
     * @return static|null
     */
    public static function findByUsername($username)
    {
        foreach (self::getUsers() as $user) {
            if (strcasecmp($user['username'], $username) === 0) {
                return new static($user);
            }
        }

        return null;
    }

    /**
     * @inheritdoc
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @inheritdoc
     */
    public function getAuthKey()
    {
        return $this->authKey;
    }

    /**
     * @inheritdoc
     */
    public function validateAuthKey($authKey)
    {
        return $this->authKey === $authKey;
    }

    /**
     * Validates password
     *
     * @param  string  $password password to validate
     * @return boolean if password provided is valid for current user
     */
    public function validatePassword($password)
    {

    }
}

$config = parse_ini_file(__DIR__ . '/../env.ini', true);
User::$ADMIN_ACCESS_TOKEN = @$config['admin_access_token'] ?: bin2hex(openssl_random_pseudo_bytes(16));
User::$ADMIN_PASSWORD = @$config['admin_password'] ?: bin2hex(openssl_random_pseudo_bytes(16));
