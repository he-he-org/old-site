<?php
namespace app\components;

use Yii;
use yii\base\Exception;

class I18N extends \yii\i18n\I18N
{
    public $languageParams = [];
    public $currencyParams = [];

    public function getLanguageParams() {
        if (array_key_exists(Yii::$app->language, $this->languageParams)) {
            return $this->languageParams[Yii::$app->language];
        }
        throw new Exception('Language params no set: ' . Yii::$app->language);
    }

    public function getLanguageParam($param) {
        $params = $this->getLanguageParams();
        if(array_key_exists($param, $params)) {
            return $params[$param];
        }
        throw new Exception('Param "' . $param . '" no set for language ' . Yii::$app->language);
    }

    public function getCurrency() {
        return $this->getLanguageParam('defaultCurrency');
    }

    public function getCurrencyParams() {
        if (array_key_exists($this->getCurrency(), $this->currencyParams)) {
            return $this->currencyParams[$this->getCurrency()];
        }
        throw new Exception('Currency params no set: ' . $this->getCurrency());
    }

    public function getCurrencyParam($param) {
        $params = $this->getCurrencyParams();
        if(array_key_exists($param, $params)) {
            return $params[$param];
        }
        throw new Exception('Param "' . $param . '" no set for currency ' . $this->getCurrency());
    }

    public function getCurrencySign() {
        //todo: move to config
        switch($this->getCurrency()) {
            case 'RUR': return "₽";
            case 'USD': return "$";
            case 'EUR': return "€";
            default: throw new Exception('Unknown currency: ' . $this->getCurrency());
        }
    }

    public function getCurrencyTemplate() {
        return $this->getLanguageParam('currencyTemplate');
    }

    public function formatCurrency($amount) {
        return $this->translate("strings", $this->getCurrencyTemplate(), [
            'currency' => $this->getCurrencySign(),
            'amount' => $amount,
        ], Yii::$app->language);
    }
}
