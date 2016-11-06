<?php

$params = require(__DIR__ . '/params.php');

$env = parse_ini_file(__DIR__ . '/../env.ini', true);

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'components' => [
        'request' => [
            'class' => 'app\components\LangRequest',
            'cookieValidationKey' => @$env['yii_request_cookie_validation_key'],
            'parsers' => [
                'application/json' => 'yii\web\JsonParser',
            ]
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
//            'enableAutoLogin' => true,
            'enableSession' => true,
            'loginUrl' => null,
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
                [
                    'class' => 'app\components\SqlFileLogTarget',
                    'enabled' => false,
                    'logFile' => '@runtime/logs/sql.log',
                ],
            ],
        ],
        'db' => require(__DIR__ . '/db.php'),
        'urlManager' => [
            'class' => 'app\components\LangUrlManager',
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => [
                        'translation-string',
                        'translation-text',
                        'member',
                        'news-item',
                        'news-tag',
                        'news-news-tag',
                        'vacancy',
                    ],
                    'prefix' => 'api'
                ],
                'paypal' => 'paypal/main',
                'paypal/<action>' => 'paypal/<action>',
                'i18n/<action>' => 'i18n/<action>',
                'admin' => 'admin/main',
                'api/volunteers/<action>' => 'volunteers/<action>',
                'admin/<section:.*>' => 'admin/<section>',
                '<page>/<section:.*>/<subsection:.*>' => 'site/<page>',
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
            'class' => 'app\components\I18N',
            'translations' => [
                'strings*' => [
                    'class' => 'app\components\MysqlMessageSource',
                ],
                'texts*' => [
                    'class' => 'app\components\MysqlTextsMessageSource',
                    'rootScope' => 'texts'
                ],
            ],
            'languageSettings' => [
                'ru-RU' => [
                    'defaultCurrency' => 'RUB',
                    'currencyTemplate' => '{amount} {currency}',
                ],
                'en-US' => [
                    'defaultCurrency' => 'USD',
                    'currencyTemplate' => '{currency}{amount}',
                ],
                'es-ES' => [
                    'defaultCurrency' => 'USD',
                    'currencyTemplate' => '{currency}{amount}',
                ],
            ],
            'currencySettings' => [
                'RUB' => [
                    'symbol' => '₽',
                    'donationOption1' => 300,
                    'donationOption2' => 500,
                    'donationOption3' => 1000,
                    'donationOption4' => 2000,
                ],
                'USD' => [
                    'symbol' => '$',
                    'donationOption1' => 10,
                    'donationOption2' => 20,
                    'donationOption3' => 50,
                    'donationOption4' => 100,
                ],
                'EUR' => [
                    'symbol' => '€',
                    'donationOption1' => 10,
                    'donationOption2' => 20,
                    'donationOption3' => 50,
                    'donationOption4' => 100,
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
