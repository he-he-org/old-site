<?php

namespace app\controllers;

use app\components\LangRequest;
use Yii;
use yii\web\Controller;
use GuzzleHttp\Psr7;

class TranslationsController extends Controller
{
    public function beforeAction($action) {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }


    public function actionMain()
    {
        $this->layout = 'empty';

        $params = json_decode(Yii::$app->request->getRawBody());

        //todo: check resource format

        if (in_array($params->language, array_values(Yii::$app->request->languages))) {
            Yii::$app->language = $params->language;
        }

        $strings = [];
        foreach($params->strings as $key) {
            $strings[$key] =  \Yii::t('strings', $key);
        }

        $texts = [];
        foreach($params->texts as $key) {
            $texts[$key] =  \Yii::t('texts', $key);
        }

        $result = [
            'strings' => $strings,
            'texts' => $texts,
        ];

        return json_encode($result);
    }
}
