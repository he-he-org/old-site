<?php

namespace app\modules\api\controllers;

use app\modules\api\components\RestAuthController;
use app\modules\api\components\RestSearchController;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBasicAuth;
use yii\rest\ActiveController;

class VacancyController extends ActiveController
{
    public $modelClass = 'app\models\Vacancy';

    use RestSearchController, RestAuthController;
}
