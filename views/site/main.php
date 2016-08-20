<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;
use app\widgets\shared\MainDonateForm;
use app\assets\MainAsset;
use yii\helpers\Url;

$this->title = 'Health & Help';

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
