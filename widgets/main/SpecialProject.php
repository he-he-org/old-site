<?php
namespace app\widgets\main;
use yii\base\Widget;
use yii\helpers\Html;

class SpecialProject extends Widget {

    public $title;
    public $desc;
    public $news;
    public $modifier;
    public $details_url = null;
    public $news_tag_id;

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
            'details_url' => $this->details_url,
            'news_tag_id' => $this->news_tag_id,
        ]);
    }
}
