<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;
use app\widgets\shared\MainDonateForm;
use app\assets\MainAsset;
use yii\helpers\Url;

//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Main';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Главная';
}

$this->title = 'Health & Help - ' . $pageName;

MainAsset::register($this);

?>
<div class="row intro-row">
    <div class="row_block-6 intro">
        <?= \Yii::t('texts', 'main/intro') ?>
    </div>
    <div class="row_block-5">
        <?= MainDonateForm::widget() ?>
    </div>
</div>
<div class="row  all-members-link-row">
    <a href="<?= Url::toRoute(['team']) ?>"><?= \Yii::t('strings', 'main/team-title') ?></a>
</div>
<div class="row team-row">
    <?php foreach ($members as $member ) {?>
        <?= TeamMemberWidget::widget($member) ?>
    <?php } ?>
</div>

<div class="row special-projects-title-row"><?= \Yii::t('strings', 'main/special-projects-title') ?></div>
<?php foreach ($specialProjects as $specialProject) { ?>
    <div class="row">
        <?= SpecialProject::widget($specialProject) ?>
    </div>
<?php } ?>
