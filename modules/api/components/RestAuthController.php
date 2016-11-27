<?php
namespace app\modules\api\components;

use Yii;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBasicAuth;

trait RestAuthController
{
    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['access'] = [
            'class' => AccessControl::className(),
            'only' => ['login', 'logout', 'signup'],
            'rules' => [
                [
                    'allow' => false,
                    'roles' => ['?'],
                ],
                [
                    'allow' => true,
                    'roles' => ['@'],
                ],
            ],
        ];

        $behaviors['authenticator'] = [
            'class' => HttpBasicAuth::className(),
        ];

        return $behaviors;
    }
}
