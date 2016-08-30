<?php

namespace app\assets;

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
}
