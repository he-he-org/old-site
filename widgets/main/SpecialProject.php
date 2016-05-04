<?php
namespace app\widgets\main;
use yii\base\Widget;
use yii\helpers\Html;

class SpecialProject extends Widget {

    public $title;
    public $desc;
    public $news;
    public $modifier;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('special_project', [
            'title' => $this->title,
            'desc' => $this->desc,
            'news' => $this->news,
            'modifier' => $this->modifier,
        ]);
    }
}