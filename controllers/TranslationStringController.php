<?php

namespace app\controllers;

use app\components\RestSearchController;
use yii\rest\ActiveController;

class TranslationStringController extends ActiveController
{
    use RestSearchController;

    public $modelClass = 'app\models\TranslationString';
}
