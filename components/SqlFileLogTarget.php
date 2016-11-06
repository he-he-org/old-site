<?php
namespace app\components;


use Yii;
use yii\log\Logger;

class SqlFileLogTarget extends \yii\log\FileTarget {

    public $categories = ['yii\db\Command::execute'];
    public $logVars = [];

    public function getLevels()
    {
        return 0 | Logger::LEVEL_INFO;
    }

    public function formatMessage($message)
    {
        list($text, $level, $category, $timestamp) = $message;
        return $text . ';';
    }
}
