<?php

namespace app\controllers;

use app\components\RestSearchController;
use yii\rest\ActiveController;

class NewsItemController extends ActiveController
{
    use RestSearchController;

    public $modelClass = 'app\models\NewsItem';
}
