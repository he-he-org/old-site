<?php

use app\widgets\help\HelpOptions;
use yii\helpers\Url;

\app\assets\HelpCommonAsset::register($this);

$this->title = 'Health & Help - ' . \Yii::t('strings', 'layout/main-menu/help');

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

<?php } else if ($mainSection === 'send-a-package') { ?>

    <?php include("help/send-a-package.php") ?>

<?php } ?>
