<?php
namespace app\widgets\layout;
use yii\base\Widget;
use yii\helpers\Html;

class LanguageSwitcher extends Widget {

    public $items;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('language_switcher', [
            'items' => $this->items,
        ]);
    }
}
