<?php
namespace app\controllers;

use app\components\RestSearchController;
use yii\rest\ActiveController;

class MemberController extends ActiveController
{
    public $modelClass = 'app\models\Member';

    use RestSearchController;
}
