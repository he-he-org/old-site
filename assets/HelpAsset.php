<?php

namespace app\assets;

use yii\helpers\Url;

class HelpAsset extends BaseAsset
{
    public $css = [
        'css/help.css',
    ];
    public $js = null;
    public $depends = [
        'app\assets\AppAsset'
    ];

    function __construct() {
        parent::__construct();
        $this->js = [
            Url::toRoute('/translations/main-donate-form'),
            'js/help.js',
        ];
    }
}
