<?php
namespace app\components;

use yii\web\UrlManager;

class LangUrlManager extends UrlManager
{
    public function createUrl($params)
    {
        $lang = \Yii::$app->request->getLang();
        if(array_key_exists('lang', $params)) {
            $langParam = $params['lang'];
            if ($langParam === 'en' || $langParam === 'ru' || $langParam === 'es') {
                $lang = $langParam;
            }
            unset($params['lang']);
        }

        $url = parent::createUrl($params);

        return '/' . $lang . $url;
    }
}
