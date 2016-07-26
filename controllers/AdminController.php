<?php

namespace app\controllers;

use app\components\ExtMarkdown;
use app\models\Member;
use app\models\NewsItem;
use app\models\NewsTag;
use app\models\User;
use Yii;
use yii\filters\AccessControl;
use yii\filters\auth\HttpBasicAuth;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;
use yii\web\Response;

class AdminController extends Controller
{
    public $defaultAction = 'main';

    public function beforeAction($action) {
        $this->enableCsrfValidation = $action->id !== 'login' && $action->id !== 'logout' && $action->id !== 'user';
        return parent::beforeAction($action);
    }

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

    public function actionLogin() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $username = Yii::$app->request->post('username');
        $password = Yii::$app->request->post('password');
        if ($username && $password) {
            $user = User::findByUsername($username);
            if ($user) {
                $isValid = Yii::$app->getSecurity()->validatePassword($password, $user->password);
                if ($isValid) {
                    Yii::$app->user->login($user);
                    return;
                }
            }
        }
        Yii::$app->response->statusCode = 401;
    }

    public function actionLogout() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $user = Yii::$app->user->identity;
        if ($user) {
            Yii::$app->user->logout();
        }
        else {
            Yii::$app->response->statusCode = 401;
        }
    }

    public function actionUser() {
        Yii::$app->response->format = Response::FORMAT_JSON;
        $user = Yii::$app->user->identity;
        if ($user) {
            return [
                'id' => $user->id,
                'username' => $user->username,
                'accessToken' => $user->accessToken,
            ];
        }
        Yii::$app->response->statusCode = 401;
    }

}
