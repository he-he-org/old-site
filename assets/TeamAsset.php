<?php

namespace app\assets;

class TeamAsset extends BaseAsset
{
    public $css = [
        'css/team.css',
    ];
    public $js = [
        'js/team.js'
    ];
    public $depends = [
        'app\assets\AppAsset'
    ];
}
