<?php

namespace app\controllers;

use app\components\RestAuthController;
use app\components\RestSearchController;
use yii\rest\ActiveController;

class TranslationTextController extends ActiveController
{
    use RestSearchController, RestAuthController;

    public $modelClass = 'app\models\TranslationText';
}
