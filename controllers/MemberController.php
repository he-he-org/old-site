<?php
namespace app\controllers;

use app\components\RestAuthController;
use app\components\RestSearchController;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBasicAuth;
use yii\rest\ActiveController;

class MemberController extends ActiveController
{
    public $modelClass = 'app\models\Member';

    use RestSearchController, RestAuthController;
}
