<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;
use app\assets\VolunteersAsset;

//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Became a member';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Стать волонтером';
}

$this->title = 'Health & Help - ' . $pageName;
VolunteersAsset::register($this);

?>

<div class="row">
    <div class="row_block-6"><?= Yii::t('texts/help', 'help/volunteers/part1') ?></div>
</div>

<div class="row row--separate">
    <div class="row_block-12 features-block">
        <div class="feature"><div class="feature_content"><img class="feature_img" src="/images/no_image.png"/><div class="feature_text" >Упорно и бесплатно работать, чтобы изменить жизнь людей к лучшему</div></div></div>
        <div class="feature"><div class="feature_content"><img class="feature_img" src="/images/no_image.png"/><div class="feature_text" >Уметь хорошо выполнять свою работу</div></div></div>
        <div class="feature"><div class="feature_content"><img class="feature_img" src="/images/no_image.png"/><div class="feature_text" >Уважать чужую культуру, расу, религию и ценности</div></div></div>
        <div class="feature"><div class="feature_content"><img class="feature_img" src="/images/no_image.png"/><div class="feature_text" >Придерживаться высоких моральных ценностей</div></div></div>
    </div>
</div>

<div class="row row--separate">
    <div class="row_block-12 features-block features-block--centered">
        <div class="feature"><div class="feature_content"><img class="feature_img" src="/images/no_image.png"/><div class="feature_text">Сделать плановые прививки, от гепатита А, В, брюшного тифа и бешенства</div></div></div>
        <div class="feature"><div class="feature_content"><img class="feature_img" src="/images/no_image.png"/><div class="feature_text">Оплатить проезд и дорожные расходы</div></div></div>
        <div class="feature"><div class="feature_content"><img class="feature_img" src="/images/no_image.png"/><div class="feature_text">Сделать взнос в 600$ на покупку лекарств, расходных материалов для клиники и медицинских бригад</div></div></div>
    </div>
</div>


<div class="row row--separate">
    <div class="row_block-6"><?= Yii::t('texts/help', 'help/volunteers/part2') ?></div>
    <div class="row_block-6"><?= Yii::t('texts/help', 'help/volunteers/part3') ?></div>
</div>
<div class="row row--separate">
    <div class="row_block-8"><?= Yii::t('texts/help', 'help/volunteers/part4') ?></div>
</div>
