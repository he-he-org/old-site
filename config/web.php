<?php

$params = require(__DIR__ . '/params.php');

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'class' => 'app\components\LangRequest',
            'cookieValidationKey' => 'dP2rUYAXX50oCRVqQ3p4yGNggvfFLVti',
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning', 'info', 'trace'],
                ],
            ],
        ],
        'db' => require(__DIR__ . '/db.php'),
        'urlManager' => [
            'class' => 'app\components\LangUrlManager',
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                ['class' => 'yii\rest\UrlRule', 'controller' => 'translation-string', 'prefix' => 'api'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'translation-text', 'prefix' => 'api'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'member', 'prefix' => 'api'],
                ['class' => 'yii\rest\UrlRule', 'controller' => 'news-item', 'prefix' => 'api'],
                'admin' => 'admin/main',
                '<page>/<section:.*>' => 'site/<page>',
                '<page>' => 'site/<page>',
            ],
        ],
        'assetManager' => [
            'bundles' => [
                'yii\web\JqueryAsset' => [
                    'js'=>[]
                ],
                'yii\bootstrap\BootstrapPluginAsset' => [
                    'js'=>[]
                ],
                'yii\bootstrap\BootstrapAsset' => [
                    'css' => [],
                ],

            ],
        ],
        'i18n' => [
            'translations' => [
                'strings*' => [
                    'class' => 'app\components\MysqlMessageSource',
                ],
                'texts*' => [
                    'class' => 'app\components\MysqlTextsMessageSource',
                    'rootScope' => 'texts'
                ],
            ],
        ],


    ],
    'params' => $params,
    'sourceLanguage'=>'00',
    'language' => 'ru-RU',
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
    ];
}

return $config;
