<?php

namespace app\assets;

class NewsAsset extends BaseAsset
{
    public $css = [
        'css/news.css',
    ];
    public $js = [
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];
}
