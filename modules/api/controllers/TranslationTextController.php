<?php

namespace app\modules\api\controllers;

use app\modules\api\components\RestAuthController;
use app\modules\api\components\RestSearchController;
use yii\rest\ActiveController;

class TranslationTextController extends ActiveController
{
    use RestSearchController, RestAuthController;

    public $modelClass = 'app\models\TranslationText';
}
