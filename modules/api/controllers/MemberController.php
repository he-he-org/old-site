<?php
namespace app\modules\api\controllers;

use app\modules\api\components\RestAuthController;
use app\modules\api\components\RestSearchController;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBasicAuth;
use yii\rest\ActiveController;

class MemberController extends ActiveController
{
    public $modelClass = 'app\models\Member';

    use RestSearchController, RestAuthController;
}
