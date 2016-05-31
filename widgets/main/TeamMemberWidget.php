<?php
namespace app\widgets\main;
use yii\base\Widget;
use yii\helpers\Html;

class TeamMemberWidget extends Widget {
    public $name;
    public $role;
    public $vk;
    public $fb;
    public $photo_url;
    public $email;
    public $linked_in;

    public function init()
    {
        parent::init();
    }

    public function run()
    {
        return $this->render('team_member', [
            'name' => $this->name,
            'role' => $this->role,
            'photo_url' => $this->photo_url,
        ]);
    }
}
