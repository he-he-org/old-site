<?php

namespace app\assets;
use yii\web\AssetBundle;

class ContactsAsset extends AssetBundle
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/contacts.css',
    ];
    public $js = [
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];
}
