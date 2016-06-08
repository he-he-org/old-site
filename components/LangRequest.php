<?php
namespace app\components;

use yii\web\Request;
use Yii;

class LangRequest extends Request
{
    private $languages = [
        'en' => 'en-US',
        'ru' => 'ru-RU',
        'es' => 'es-ES',
    ];

    private $currentLang = 'ru';

    protected function resolvePathInfo() {
        $path = parent::resolvePathInfo();
        $parts = explode('/', $path);

        if (count($parts) > 0 && array_key_exists ($parts[0], $this->languages)) {
            $this->currentLang = $parts[0];
            Yii::$app->language = $this->languages[$this->currentLang];
            return implode('/', array_slice($parts, 1));
        }
        else {
            return $path;
        }
    }

    public function getLang() {
        return $this->currentLang;
    }

    public function getPage($default = '') {
        $parts = explode('/', $this->pathinfo);
        if (count($parts) < 1 || $parts[0] === '') {
            return $default;
        }
        else {
            return $parts[0];
        }
    }

    public function getSection($default = '') {
        $parts = explode('/', $this->pathinfo);
        if (count($parts) < 2 || $parts[1] === '') {
            return $default;
        }
        else {
            return $parts[1];
        }
    }

}
