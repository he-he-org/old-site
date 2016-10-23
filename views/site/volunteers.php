<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;
use app\assets\VolunteersAsset;

$this->title = 'Health & Help - ' . \Yii::t('strings', 'layout/main-menu/volunteers');

VolunteersAsset::register($this);

?>

<?php $mainSection = Yii::$app->request->getSectionPart(0, 'requirements') ?>

<?php if ($mainSection === 'requirements') { ?>

    <?php include("volunteers/requirements.php") ?>

<?php } else if ($mainSection === 'questionnaire') { ?>

    <?php include("volunteers/questionnaire.php") ?>

<?php } ?>

