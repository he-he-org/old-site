<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use GuzzleHttp\Psr7;

class TranslationsController extends Controller
{
    private $languages = [
        'en' => 'en-US',
        'ru' => 'ru-RU',
        'es' => 'es-ES',
    ];

    static $resources = [
        'main-donate-form' => [
            'strings' => [
                'help/donate/donate-button-title',
                'help/donate/provider-options/ym',
                'help/donate/amount-options/other-amount',
                'help/main-donation-form/money-template',
                'help/donate/info/for-us/title',
                'help/donate/info/for-them/title',
                'help/donate/info/300/for-us/options/1',
                'help/donate/info/300/for-us/options/2',
                'help/donate/info/300/for-us/options/3',
                'help/donate/info/300/for-them/options/1',
                'help/donate/info/500/for-us/options/1',
                'help/donate/info/500/for-us/options/2',
                'help/donate/info/500/for-us/options/3',
                'help/donate/info/500/for-them/options/1',
                'help/donate/info/1000/for-us/options/1',
                'help/donate/info/1000/for-us/options/2',
                'help/donate/info/1000/for-them/options/1',
                'help/donate/info/1000/for-them/options/2',
                'help/donate/info/1000/for-them/options/3',
                'help/donate/formcomment',
                'help/donate/short-dest',
                'help/donate/targets',
            ],
            'texts' => []
        ]
    ];

    public function actionMain()
    {
        $this->layout = 'empty';
        $resourceName = Yii::$app->request->get('resource');
        $resource = self::$resources[$resourceName];

        $strings = [];
        foreach($resource['strings'] as $key) {
            $strings[$key] =  \Yii::t('strings', $key);
        }

        $texts = [];
        foreach($resource['texts'] as $key) {
            $texts[$key] =  \Yii::t('texts', $key);
        }

        $result = [
            'strings' => $strings,
            'texts' => $texts,
        ];

        return 'window.i18n = ' . json_encode($result);
    }
}
