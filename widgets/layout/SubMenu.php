<?php
namespace app\widgets\layout;
use yii\base\Widget;
use yii\helpers\Html;

class SubMenu extends Widget {

    public $items;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('sub_menu', [
            'items' => $this->items,
        ]);
    }
}
