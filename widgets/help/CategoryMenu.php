<?php
namespace app\widgets\help;
use yii\base\Widget;
use yii\helpers\Html;

class CategoryMenu extends Widget {

    public $items;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('category_menu', [
            'items' => $this->items,
        ]);
    }
}
