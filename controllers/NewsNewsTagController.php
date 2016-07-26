<?php

namespace app\controllers;

use app\components\RestAuthController;
use app\components\RestSearchController;
use yii\rest\ActiveController;

class NewsNewsTagController extends ActiveController
{
    use RestSearchController, RestAuthController;

    public $modelClass = 'app\models\NewsNewsTag';
}
