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
            'name' => self::splitName($this->name),
            'role' => $this->role,
            'photo_url' => $this->photo_url,
            'vk' => $this->vk,
            'fb' => $this->fb,
            'email' => $this->email,
            'linked_in' => $this->linked_in,
        ]);
    }

    public static function splitName($name) {
        $parts = split(" ", $name);
        $result = "";
        $splitIndex = intval((count($parts) - 1) / 2);
        for($i = 0; $i < count($parts); $i++) {
            $result .= $parts[$i] . " ";
            if ($i === $splitIndex) {
                $result .= "</br>";
            }
        }
        return $result;
    }
}
