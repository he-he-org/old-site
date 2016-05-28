<?php
namespace app\widgets\help;
use yii\base\Widget;
use yii\helpers\Html;

class PreparedPackage extends Widget {
    public $title;
    public $desc;
    public $cost;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('prepared_package',[
            'title' => $this->title,
            'desc' => $this->desc,
            'cost' => $this->cost,
        ]);
    }
}
