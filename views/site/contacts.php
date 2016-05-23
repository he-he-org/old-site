<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;


//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Contacts';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Контакты';
}

$this->title = 'Health & Help - ' . $pageName;

?>

<p> Погодите, контакты делаем... </p>
