<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;


//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Became a member';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Стать волонтером';
}

$this->title = 'Health & Help - ' . $pageName;

?>

<p>
    Тут будет информация о том, как стать волонтером.
</p>

<p>
    Интересно?
</p>
