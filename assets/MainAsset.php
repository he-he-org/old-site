<?php

namespace app\assets;
use yii\web\AssetBundle;

class MainAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/main.css',
    ];
    public $js = [
        'js/vendor.js',
        'js/page-main.js',
    ];
    public $depends = [
    ];
}
