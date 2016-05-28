<?php
use yii\helpers\Url;
use app\helpers\RouteHelper;

?>

<div class="category-menu">
    <?php foreach ($items as $item) { ?>
        <?php $isActive = RouteHelper::getSection(Yii::$app->request->pathinfo, 'pharmacy') ===  RouteHelper::getSection(Url::toRoute($item['url']), 'pharmacy') ?>
        <a href="<?= Url::toRoute($item['url']) ?>" class="category-menu_item<?= $isActive ? ' category-menu_item--active' : '' ?>">
            <?= $item['title'] ?>
        </a>
    <?php } ?>
</div>
