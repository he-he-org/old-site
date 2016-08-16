<?php


use app\assets\HelpAsset;

use app\widgets\help\HelpOptions;
use yii\helpers\Url;

$pageName = 'Help';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Помочь проекту';
}

$this->title = 'Health & Help - ' . $pageName;

HelpAsset::register($this);
?>

<div class="row row--separate-bottom">
    <div class="row_block-12">
        <?= HelpOptions::widget(['items' => [
            ['title' => \Yii::t('strings', 'help/submenu/send-a-package/title'), 'section' => 'package', 'icon_url' => '/images/help/shipping.svg'],
            ['title' => \Yii::t('strings', 'help/submenu/donate-now/title'), 'section' => 'donate', 'icon_url' => '/images/help/card.svg'],
            ['title' => \Yii::t('strings', 'help/submenu/donate-now/become-a-volunteer'), 'url' => Url::toRoute(['/volunteers']), 'icon_url' => '/images/help/user.svg'],
        ]]) ?>
    </div>
</div>

<?php $mainSection = Yii::$app->request->getSectionPart(0, 'package') ?>

<?php if ($mainSection === 'package') { ?>

    <?php include("help/package.php") ?>

<?php } else if ($mainSection === 'donate') { ?>

    <?php include("help/donate.php") ?>

<?php } else if ($mainSection === 'russian-post') { ?>

    <?php include("help/russian-post.php") ?>

<?php } ?>
