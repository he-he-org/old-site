<?php

namespace app\controllers;

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
        $people = [
            [
                'name' => 'Виктория Валикова',
                'photo_url' => '/images/main/members/viktoriya_valikova_4x3_small.jpg',
                'vk' => 'http://vk.com/vik.valikova',
                'fb' => 'https://www.facebook.com/viktoriya.valikova',
                'email' => 'viktoriya.valikova@gmail.com',
                'role' => 'Основатель, врач',
            ],
            [
                'name' => 'Карина Башарова',
                'photo_url' => '/images/main/members/karina_basharova_4х3_small.jpg',
                'vk' => 'http://vk.com/kr.basharova',
                'fb' => 'https://www.facebook.com/kr.basharova',
                'email' => 'kr.basharova@gmail.com',
                'role' => 'Исполнительный директор, врач',
            ],
            [
                'name' => 'Сергио Оттониель Кастийо Мендоза',
                'photo_url' => '/images/main/members/serdjio_4x3_small.jpg',
                'vk' => 'http://vk.com/id324087451',
                'fb' => 'https://www.facebook.com/otto.castillo.71',
                'email' => 'Sergiocastillomed@outlook.com',
                'role' => 'Основатель, врач',
            ],
            [
                'name' => 'Михаил Шишин',
                'photo_url' => '/images/main/members/mihail_shishin_4х3_small.jpg',
                'vk' => 'http://vk.com/id2103608',
                'role' => 'Архитектор',
            ],
            [
                'name' => 'Игорь Енин',
                'photo_url' => '/images/main/members/igor_enin_4x3_small.jpg',
                'vk' => 'http://vk.com/ropepark_tb',
                'email' => 'gaareg@mail.ru',
                'role' => 'Главный инженер',
            ],
            [
                'name' => 'Маргарита Кудрявцева',
                'photo_url' => '/images/main/members/margarita_kudryavtseva 4х3_small.jpg',
                'vk' => 'https://vk.com/id774962',
                'email' => 'ritakudryavtseva@gmail.com',
                'role' => 'Рекрутер',
            ],
            [
                'name' => 'Яна Захарова',
                'photo_url' => '/images/main/members/yana_zaharova_4x3_small.jpg',
                'vk' => 'http://vk.com/id530346',
                'fb' => 'https://www.facebook.com/yana.msu',
                'email' => 'yana.zakh@gmail.com',
                'role' => 'Бухгалтер',
            ],
            [
                'name' => 'Дарья Царик',
                'photo_url' => '/images/main/members/daria_tsarik_4х3_small.jpg',
                'email' => 'alcharkoc@gmail.com',
                'fb' => 'https://www.facebook.com/dariatsaryk',
                'role' => 'Фандрайзер',
            ],
            [
                'name' => 'Михаил Никифоров',
                'photo_url' => '/images/main/members/mihail_nikiforof_4x3_small.jpg',
                'vk' => 'http://vk.com/id1139974',
                'email' => 'nimimi@yandex.ru',
                'role' => 'Координатор дистанционных волонтеров',
            ],
            [
                'name' => 'Лариса Мельникова',
                'photo_url' => '/images/main/members/larisa_melnikova_4x3_small.jpg',
                'email' => 'larisa.v.melnikova@gmail.com',
                'fb' => 'http://facebook.com/laramelnikova',
                'linked_in' => 'https://www.linkedin.com/in/larisamelnikova',
                'role' => 'Управление IT-проектами и переговорами',
            ],
            [
                'name' => 'Елизавета Шишина',
                'photo_url' => '/images/main/members/elizaveta_shishina_4х3_small.jpg',
                'vk' => 'http://vk.com/liz.shishina',
                'role' => 'Архитектор',
            ],
        ];
        return $this->render('main', [
            'people' => $people
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
        return $this->render('news');
    }

    public function actionContacts()
    {
        $this->layout = 'main';
        return $this->render('contacts');
    }

}
