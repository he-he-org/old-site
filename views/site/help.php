<?php


use app\assets\HelpAsset;

use app\widgets\help\HelpOptions;

$pageName = 'Help';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Помочь проекту';
}

$this->title = 'Health & Help - ' . $pageName;

HelpAsset::register($this);
?>


<div class="row">
    <div class="row_block-12">
        <?= HelpOptions::widget(['items' => [
            ['title' => 'Отправить посылку', 'section' => 'package', 'icon_url' => '/images/help/shipping.svg'],
            ['title' => 'Сделать пожертвование', 'section' => 'donate', 'icon_url' => '/images/help/card.svg'],
            ['title' => 'Стать волонтером', 'section' => 'volunteer', 'icon_url' => '/images/help/user.svg'],
        ]]) ?>
    </div>
</div>

<?php $mainSection = Yii::$app->request->getSectionPart(0, 'package') ?>

<?php if ($mainSection === 'package') { ?>

    <?php include("help/package.php") ?>

<?php } else if ($mainSection === 'donate') { ?>

    <?php include("help/donate.php") ?>

<?php } else if ($mainSection === 'volunteer') { ?>

    <?php include("help/volunteer.php") ?>

<?php } ?>
