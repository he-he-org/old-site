<?php

use app\assets\TeamAsset;
use app\widgets\main\TeamMemberWidget;
use app\widgets\shared\MainDonateForm;

//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Main';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Вся команда';
}

$this->title = 'Health & Help - ' . $pageName;

TeamAsset::register($this);

?>
<div class="row intro-row">
    <div class="row_block-6 intro">
        <h1><?= \Yii::t('strings', 'team/title') ?></h1>
        <p><?= \Yii::t('texts', 'team/desc') ?></p>
    </div>
    <div class="row_block-5">
        <?= MainDonateForm::widget() ?>
    </div>
</div>
<?php for ($i = 0; $i < count($members); $i+=6) { ?>
    <div class="row team-row">
        <?php foreach (array_slice($members, $i, 6) as $member ) {?>
            <?= TeamMemberWidget::widget($member) ?>
        <?php } ?>
    </div>
<?php } ?>
