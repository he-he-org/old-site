<?php

use app\assets\AboutAsset;
use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;

//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Main';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Главная';
}

$this->title = 'Health & Help - ' . $pageName;

AboutAsset::register($this);

?>
<div class="row intro-row about">
    <div class="row_block-8">

        <?= \Yii::t('texts/about', 'about/history/text') ?>

    </div>

</div>
