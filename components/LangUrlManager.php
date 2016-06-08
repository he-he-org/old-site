<?php
namespace app\components;

use yii\web\UrlManager;

class LangUrlManager extends UrlManager
{
    public function createUrl($params)
    {
        $url = parent::createUrl($params);

        return '/' . \Yii::$app->request->getLang() . $url;
    }
}
