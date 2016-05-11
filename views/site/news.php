<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;


//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'News';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Новости';
}

$this->title = 'Health & Help - ' . $pageName;

?>

<h1> В Братске поймали "человека-паука" </h1>
<p> Жители Братска поймали с поличным вора, который промышлял велосипедами, хранящимися на балконе.
Злоумышленник ловко забирался на нужный этаж по водосточным трубам и решеткам на окнах и столь же
ловко спускался с добычей. </p>
