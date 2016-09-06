<?php
namespace app\components;

use Yii;
use yii\base\Exception;

class I18N extends \yii\i18n\I18N
{
    public $languageSettings = [];
    public $currencySettings = [];

    public function getLanguageSettings() {
        if (array_key_exists(Yii::$app->language, $this->languageSettings)) {
            return $this->languageSettings[Yii::$app->language];
        }
        throw new Exception('Language params no set: ' . Yii::$app->language);
    }

    public function getLanguageSetting($param) {
        $params = $this->getLanguageSettings();
        if(array_key_exists($param, $params)) {
            return $params[$param];
        }
        throw new Exception('Param "' . $param . '" no set for language ' . Yii::$app->language);
    }

    public function getCurrency() {
        return $this->getLanguageSetting('defaultCurrency');
    }

    public function getCurrencySettings() {
        if (array_key_exists($this->getCurrency(), $this->currencySettings)) {
            return $this->currencySettings[$this->getCurrency()];
        }
        throw new Exception('Currency params no set: ' . $this->getCurrency());
    }

    public function getCurrencySetting($param) {
        $params = $this->getCurrencySettings();
        if(array_key_exists($param, $params)) {
            return $params[$param];
        }
        throw new Exception('Param "' . $param . '" no set for currency ' . $this->getCurrency());
    }

    public function getCurrencySymbol() {
        return $this->getCurrencySetting('symbol');
    }

    public function getCurrencyTemplate() {
        return $this->getLanguageSetting('currencyTemplate');
    }

    public function formatCurrency($amount) {
        return $this->translate("strings", $this->getCurrencyTemplate(), [
            'currency' => $this->getCurrencySymbol(),
            'amount' => $amount,
        ], Yii::$app->language);
    }
}
