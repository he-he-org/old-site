<?php
use yii\helpers\Url;
use app\helpers\RouteHelper;

?>

<div class="category-menu">
    <?php $mainSection = Yii::$app->request->getSectionPart(0, 'package'); ?>
    <?php foreach ($items as $item) { ?>
        <?php $isActive = Yii::$app->request->getSectionPart(1, 'pharmacy') === $item['section']; ?>
        <a href="<?= Url::toRoute(["help/$mainSection/${item['section']}"]) ?>" class="category-menu_item<?= $isActive ? ' category-menu_item--active' : '' ?>">
            <?= $item['title'] ?>
        </a>
    <?php } ?>
</div>
