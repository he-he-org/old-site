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

    public function behaviors()
    {
        $behaviours = [];

        //todo: is this an appropriate place to disable/enable cache
        if (YII_DEBUG) {
            array_push($behaviours, [
                'class' => 'yii\filters\PageCache',
                'duration' => 3600,
            ]);
        }
        
        return $behaviours;
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

        $specialProjects = [
            [
                'anchor' => 'crowdfunding-2',
                'title' => 'Строительство клиники',
                'modifier' => 'green',
                'desc' => 'Собираем средства на второй этап строительства клиники и организацию регулярных выездов мобильных бригад',
                'details_url' => 'https://www.generosity.com/medical-fundraising/let-s-build-a-clinic-for-locals-in-guatemala',
                'news_tag_id' => 'краудфандинг 2',
            ],
            [
                'anchor' => 'eye-care',
                'title' => 'Очки для индейцев Майя',
                'modifier' => 'blue',
                'desc' => 'Твои старые очки помогут гватемальцу вернуться к работе и спасти свою семью от бедности',
                'news_tag_id' => 'офтальмологическая программа',
            ],
            [
                'anchor' => 'mobile-teams',
                'title' => 'Мобильные бригады',
                'modifier' => 'red',
                'desc' => 'Мы регулярно берем лекарства и инструменты, садимся в наш пикап и едем лечить людей из отдаленных поселений',
                'news_tag_id' => 'мобильные бригады',
            ]
        ];

        $parser = new ExtMarkdown();
        $specialProjects = array_map(function($specialProject) use ($parser) {
            $tag = NewsTag::find()->joinWith('title t')->where(['t.ru-RU' => $specialProject['news_tag_id']])->one();
            
            if ($tag !== null) {
                $news = $tag->getNews()->orderBy(['date' => SORT_DESC])->limit(4)->all();
                $news = array_map(function($item) use ($parser){
                    return $item['title'][Yii::$app->language];
                }, $news);
            }
            else {
                $news = [];
            }

            return array_replace([], $specialProject, [
                'news' => $news,
                'news_tag_id' => $tag['id'],
            ]);
        }, $specialProjects);
        
        return $this->render('main', [
            'members' => $members,
            'specialProjects' => $specialProjects,
        ]);
    }

    public function actionTeam()
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

        return $this->render('team', [
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

        $newsQuery = News::find()
            ->with(['title', 'text'])
            ->orderBy(['date' => SORT_DESC]);
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
