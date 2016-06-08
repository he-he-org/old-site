<?php
use yii\helpers\Url;
use app\helpers\RouteHelper;

?>

<div class="category-menu">
    <?php foreach ($items as $item) { ?>
        <?php $isActive = Yii::$app->request->getSection('pharmacy') === $item['section'] ?>
        <a href="<?= Url::toRoute(["help/${item['section']}"]) ?>" class="category-menu_item<?= $isActive ? ' category-menu_item--active' : '' ?>">
            <?= $item['title'] ?>
        </a>
    <?php } ?>
</div>
