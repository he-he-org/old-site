<?php
namespace app\widgets\shared;
use yii\base\Widget;
use yii\helpers\Html;

class MainDonateForm extends Widget {

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('main_donate_form');
    }

}
