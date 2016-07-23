<?php

namespace app\controllers;

use app\components\RestSearchController;
use yii\rest\ActiveController;

class NewsNewsTagController extends ActiveController
{
    use RestSearchController;

    public $modelClass = 'app\models\NewsNewsTag';
}
