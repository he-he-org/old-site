<?php

namespace app\assets;
use yii\web\AssetBundle;

class TeamAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/team.css',
    ];
    public $js = [
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];
}
