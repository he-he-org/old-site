<?php

namespace app\controllers;

use app\components\ExtMarkdown;
use app\models\Member;
use app\models\NewsItem;
use app\models\NewsTag;
use app\models\Vacancy;
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
        if (!YII_DEBUG) {
            array_push($behaviours, [
                'class' => 'yii\filters\PageCache',
                'duration' => 300,
                'variations' => [
                    \Yii::$app->request->getAbsoluteUrl(),
                ]
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
                'photo_url' => $member['photo_url'],
            ];
        }, $members);

        $specialProjects = [
            [
                'anchor' => 'crowdfunding-2',
                'title' => \Yii::t('strings', 'main/special-project/clinic-title'),
                'modifier' => 'green',
                'desc' => \Yii::t('strings', 'main/special-project/clinic-desc'),
                'details_url' => 'https://www.generosity.com/medical-fundraising/let-s-build-a-clinic-for-locals-in-guatemala',
                'news_tag_id' => 'краудфандинг 2',
            ],
            [
                'anchor' => 'eye-care',
                'title' => \Yii::t('strings', 'main/special-project/glasses-title'),
                'modifier' => 'blue',
                'desc' => \Yii::t('strings', 'main/special-project/glasses-desc'),
                'news_tag_id' => 'офтальмологическая программа',
            ],
            [
                'anchor' => 'mobile-teams',
                'title' => \Yii::t('strings', 'main/special-project/brigades-title'),
                'modifier' => 'red',
                'desc' => \Yii::t('strings', 'main/special-project/brigades-desc'),
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

        if (Yii::$app->request->getSectionPart(0, 'requirements') === 'vacancies') {

            $id = Yii::$app->request->getSectionPart(1, null);

            if ($id === null) {
                $vacancies = Vacancy::find()
                    ->with(['title'])
                    ->all();
                $vacancies = array_map(function ($vacancy) {
                    return [
                        'id' => $vacancy['id'],
                        'title' => $vacancy['title'][Yii::$app->language],
                    ];
                }, $vacancies);
                return $this->render('volunteers', [
                    'vacancies' => $vacancies
                ]);
            }
            else {
                $parser = new ExtMarkdown();
                $vacancy = Vacancy::findOne(['id' => intval($id)]);
                if ($vacancy) {
                    return $this->render('volunteers', [
                        'vacancy' => [
                            'id' => $vacancy['id'],
                            'title' => $vacancy['title'][Yii::$app->language],
                            'body' => $parser->parse($vacancy['body'][Yii::$app->language]),
                        ]
                    ]);
                }
                else {
                    throw new \yii\web\NotFoundHttpException("Vacancy with id $id not found");
                }
            }

        }
        else if(Yii::$app->request->getSectionPart(0, 'requirements') === 'requirements') {
            $vacancies = Vacancy::find()
                ->with(['title'])
                ->all();
            $vacancies = array_map(function ($vacancy) {
                return [
                    'id' => $vacancy['id'],
                    'title' => $vacancy['title'][Yii::$app->language],
                ];
            }, $vacancies);
            return $this->render('volunteers', [
                'vacancies' => $vacancies
            ]);
        }
        else {
            return $this->render('volunteers');
        }

    }

    public function actionNews()
    {
        $parser = new ExtMarkdown();

        $this->layout = 'main';

        $newsQuery = NewsItem::find()
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
