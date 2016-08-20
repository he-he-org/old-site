<?php

use app\assets\AboutAsset;
use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;

$this->title = 'Health & Help - ' . \Yii::t('strings', 'layout/main-menu/about_us');

AboutAsset::register($this);

?>
<div class="row intro-row about">
    <div class="row_block-8">

        <?= \Yii::t('texts/about', 'about/history/text') ?>

    </div>

</div>
