<?php

namespace app\modules\api\controllers;

use app\components\RestAuthController;
use app\components\RestSearchController;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBasicAuth;
use yii\rest\ActiveController;

class VacancyController extends ActiveController
{
    public $modelClass = 'app\models\Vacancy';

    use RestSearchController, RestAuthController;
}
