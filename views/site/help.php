<?php

use app\widgets\layout\SubMenu;
use yii\helpers\Url;

\app\assets\HelpCommonAsset::register($this);

$this->title = 'Health & Help - ' . \Yii::t('strings', 'layout/main-menu/help');

?>

<div class="row row--separate-bottom">
    <div class="row_block-12">
        <?= SubMenu::widget([
            'items' => [
                [
                    'title' => \Yii::t('strings', 'help/submenu/send-a-package/title'),
                    'section' => 'package',
                    'icon_url' => '/images/help/shipping.svg'],
                [
                    'title' => \Yii::t('strings', 'help/submenu/donate-now/title'),
                    'section' => 'donate',
                    'icon_url' => '/images/help/card.svg'],
                [
                    'title' => \Yii::t('strings', 'help/submenu/donate-now/become-a-volunteer'),
                    'page' => 'volunteers',
                    'icon_url' => '/images/help/user.svg'
                ],
            ],
            'default_page' => 'help',
            'default_section' => 'package',
        ]) ?>
    </div>
</div>

<?php $mainSection = Yii::$app->request->getSectionPart(0, 'package') ?>

<?php if ($mainSection === 'package') { ?>

    <?php include("help/package.php") ?>

<?php } else if ($mainSection === 'donate') { ?>

    <?php include("help/donate.php") ?>

<?php } else if ($mainSection === 'send-a-package') { ?>

    <?php include("help/send-a-package.php") ?>

<?php } ?>
