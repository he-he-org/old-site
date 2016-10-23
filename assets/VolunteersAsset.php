<?php

namespace app\assets;

class VolunteersAsset extends BaseAsset
{
    public $css = [
        'css/volunteers.css',
    ];
    public $js = [
        'js/volunteers.js'
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];
}
