<?php
namespace app\widgets\help;
use yii\base\Widget;
use yii\helpers\Html;

class HelpOptions extends Widget {

    public $items;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('help_options', [
            'items' => $this->items,
        ]);
    }
}
