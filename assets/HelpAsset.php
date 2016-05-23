<?php

namespace app\assets;
use yii\web\AssetBundle;

class HelpAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/help.css',
    ];
    public $js = [
        'js/help.js',
    ];
    public $depends = [
    ];
}
