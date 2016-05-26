<?php
namespace app\widgets\layout;
use yii\base\Widget;
use yii\helpers\Html;

class MainMenu extends Widget {

    public $items;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('main_menu', [
            'items' => $this->items,
        ]);
    }
}
