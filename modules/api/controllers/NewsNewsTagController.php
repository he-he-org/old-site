<?php

namespace app\modules\api\controllers;

use app\modules\api\components\RestAuthController;
use app\modules\api\components\RestSearchController;
use yii\rest\ActiveController;

class NewsNewsTagController extends ActiveController
{
    use RestSearchController, RestAuthController;

    public $modelClass = 'app\models\NewsNewsTag';
}
