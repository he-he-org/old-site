<?php
/**
 * Created by IntelliJ IDEA.
 * User: koluch
 * Date: 31/07/16
 * Time: 15:36
 */

namespace app\assets;


use yii\web\AssetBundle;

class BaseAsset extends AssetBundle
{
    function __construct($config = []) {
        parent::__construct($config);
        $this->basePath = '@webroot/' . YII_ENV;
        $this->baseUrl = '@web/' . YII_ENV;
    }
}
