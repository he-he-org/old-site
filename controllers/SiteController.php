<?php

namespace app\controllers;

use app\components\ExtMarkdown;
use app\models\Member;
use app\models\News;
use app\models\NewsTag;
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

    public function actionAbout()
    {
        $this->layout = 'main';
        return $this->render('about');
    }

    public function actionVolunteers()
    {
        $this->layout = 'main';
        return $this->render('volunteers');
    }

    public function actionNews()
    {
        $parser = new ExtMarkdown();

        $this->layout = 'main';

        $newsQuery = News::find()->with(['title', 'text']);

        $tagParam = Yii::$app->getRequest()->getQueryParam('tag');
        if ($tagParam) {
            $tagParam = intval($tagParam);
            $newsQuery
                ->joinWith('tags as tags')
                ->where(['tags.id' => $tagParam]);
        }
        $news = $newsQuery->all();

        $news = array_map(function ($item) use ($parser) {

            return [
                'id' => $item['id'],
                'date' => strtotime($item['date']), //todo: bad, need to move it somewhere
                'title' => $item['title'][Yii::$app->language],
                'text' => $parser->parse($item['text'][Yii::$app->language]),  //todo: bad, need to move it somewhere
                'image_url' => $item['image_url'],
                'tags' => array_map(function($tag) {
                    return [
                        'id' => $tag['id'],
                        'title' => $tag['title'][Yii::$app->language],
                    ];
                }, $item['tags']),
            ];
        }, $news);

        $tags = NewsTag::find()
            ->with(['title'])
            ->joinWith('news', true, $joinType = 'INNER JOIN' )
            ->all();
        $tags = array_map(function($tag) {
            return [
                'id' => $tag['id'],
                'title' => $tag['title'][Yii::$app->language],
                'news' => $tag['news'],
            ];
        }, $tags);

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
