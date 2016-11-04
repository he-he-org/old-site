<?php
namespace app\widgets\layout;
use yii\base\Widget;
use yii\helpers\Html;

class SubMenu extends Widget {

    public $items;
    public $default_section;
    public $default_page;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('sub_menu', [
            'items' => $this->items,
            'default_section' => $this->default_section,
            'default_page' => $this->default_page,
        ]);
    }
}
