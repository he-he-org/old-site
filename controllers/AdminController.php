<?php

namespace app\controllers;

use app\components\ExtMarkdown;
use app\models\Member;
use app\models\NewsItem;
use app\models\NewsTag;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class AdminController extends Controller
{
    public $defaultAction = 'main';

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function actionMain()
    {
        $this->layout = 'empty';

        return $this->render('main');
    }

}
