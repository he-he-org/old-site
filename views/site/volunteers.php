<?php

use app\widgets\layout\SubMenu;
use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;
use app\assets\VolunteersAsset;
use yii\helpers\Url;

$this->title = 'Health & Help - ' . \Yii::t('strings', 'layout/main-menu/volunteers');

VolunteersAsset::register($this);

?>

<?php $mainSection = Yii::$app->request->getSectionPart(0, 'requirements') ?>

<div class="row row--separate-bottom">
    <div class="row_block-12">
        <?= SubMenu::widget([
            'items' => [
                [
                    'title' => \Yii::t('strings', 'volunteers/submenu/common-info/title'),
                    'section' => 'requirements',
                    'is_active' => $mainSection === 'requirements',
                    'icon_url' => '/images/volunteers/icons/requirements.svg'
                ],
    //            [
    //                'title' => \Yii::t('strings', 'volunteers/submenu/questionnaire/title'),
    //                'section' => 'questionnaire',
    //                'is_active' => $mainSection === 'questionnaire',
    //                'icon_url' => '/images/volunteers/icons/questionnaire.svg'
    //            ],
                [
                    'title' => \Yii::t('strings', 'volunteers/submenu/vacancies/title'),
                    'section' => 'vacancies',
                    'is_active' => $mainSection === 'vacancies',
                    'icon_url' => '/images/volunteers/icons/vacancies.svg'
                ],
            ],
            'default_section' => 'requirements',
        ]) ?>
    </div>
</div>

<?php if ($mainSection === 'requirements') { ?>

    <?php include("volunteers/requirements.php") ?>

<?php } else if ($mainSection === 'questionnaire') { ?>

    <?php include("volunteers/questionnaire.php") ?>

<?php } else if ($mainSection === 'vacancies') { ?>

    <?php include("volunteers/vacancies.php") ?>

<?php } ?>

