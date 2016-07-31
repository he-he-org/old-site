<?php
/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\assets;

use yii\web\AssetBundle;

/**
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class AdminAsset extends BaseAsset
{
    public $css = [
        'css/admin.css',
    ];
    public $js = [
        'js/vendor.js',
        'js/admin.js'
    ];
    public $depends = [
    ];
}
