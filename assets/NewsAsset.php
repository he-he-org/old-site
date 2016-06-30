<?php

namespace app\assets;
use yii\web\AssetBundle;

class NewsAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/news.css',
    ];
    public $js = [
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];
}
