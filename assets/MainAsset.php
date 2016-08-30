<?php

namespace app\assets;

use yii\helpers\Url;

class MainAsset extends BaseAsset
{
    public $css = [
        'css/main.css',
    ];
    public $js = [
        'js/main.js',
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];

    function __construct() {
        parent::__construct();
        $this->js = [
            Url::toRoute('/translations/main-donate-form'),
            'js/main.js',
        ];
    }
}
