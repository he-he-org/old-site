<?php
namespace app\widgets\main;
use yii\base\Widget;
use yii\helpers\Html;

class TeamMemberWidget extends Widget {
    public $name;
    public $role;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('team_member', ['name' => $this->name, 'role' => $this->role]);
    }
}
