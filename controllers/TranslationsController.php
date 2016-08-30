<?php

namespace app\controllers;

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

        $resource = json_decode(Yii::$app->request->getRawBody());

        //todo: check resource format

        $strings = [];
        foreach($resource->strings as $key) {
            $strings[$key] =  \Yii::t('strings', $key);
        }

        $texts = [];
        foreach($resource->texts as $key) {
            $texts[$key] =  \Yii::t('texts', $key);
        }

        $result = [
            'strings' => $strings,
            'texts' => $texts,
        ];

        return json_encode($result);
    }
}
