<?php

namespace app\controllers;

use app\models\Member;
use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\ContactForm;

class SiteController extends Controller
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
        $this->layout = 'main';

        $members = Member::find()
            ->with(['name', 'role'])
            ->all();

        $members = array_map(function ($member) {
            return [
                'name' => $member['name'][Yii::$app->language],
                'role' => $member['role'][Yii::$app->language],
                'vk' => $member['vk'],
                'fb' => $member['fb'],
                'photo_url' => $member['photo_url'],
                'email' => $member['email'],
                'linked_in' => $member['linked_in'],
            ];
        }, $members);

        return $this->render('main', [
            'members' => $members
        ]);
    }

    public function actionHelp()
    {
        $this->layout = 'main';
        return $this->render('help');
    }

    public function actionVolunteers()
    {
        $this->layout = 'main';
        return $this->render('volunteers');
    }

    public function actionNews()
    {
        $this->layout = 'main';
        $news = [
            [
                'id' => 1,
                'date' => 1467318954,
                'title' => 'Расскажите о нас',
                'text' => 'Информация решает самые сложные вопросы, ведь «кто владеет информацией, владеет миром». В ваших силах овладеть миром. Подумайте сами: ведь это же прекрасно, когда мир держат в руках люди, которые стремятся помочь другим! ',
                'image_url' => '/images/news_item_1.png',
                'tags' => ['строительство', 'финансы'],
            ],
            [
                'id' => 1,
                'date' => 1466112954,
                'title' => 'The standard Lorem Ipsum passage',
                'text' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'image_url' => '/images/news_item_1.png',
                'tags' => ['строительство', 'финансы'],
            ]
        ];
        $tags = [
            'Строительство',
            'Спонсоры',
            'Медикаменты',
            'Финансы',
        ];
        return $this->render('news', [
            'news' => $news,
            'tags' => $tags,
        ]);
    }

    public function actionContacts()
    {
        $this->layout = 'main';
        return $this->render('contacts');
    }

}
