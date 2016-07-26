<?php

namespace app\controllers;

use app\components\RestAuthController;
use app\components\RestSearchController;
use yii\rest\ActiveController;

class TranslationStringController extends ActiveController
{
    use RestSearchController, RestAuthController;

    public $modelClass = 'app\models\TranslationString';
}
