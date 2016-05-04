<?php
namespace app\widgets\main;
use yii\base\Widget;
use yii\helpers\Html;

class PersonWidget extends Widget {
    public $name;
    public $role;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('person_widget', ['name' => $this->name, 'role' => $this->role]);
    }
}