<?php

namespace app\assets;

class HelpAsset extends BaseAsset
{
    public $css = [
        'css/help.css',
    ];
    public $js = [
        'js/help.js',
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];
}
