<?php
use yii\helpers\Url;
?>

<div class="category-menu">
    <?php foreach ($items as $item) { ?>
        <a href="<?= Url::to($item['url']) ?>" class="category-menu_item<?= ('/'.Yii::$app->request->pathinfo === Url::to($item['url'])) ? ' category-menu_item--active' : '' ?>">
            <?= $item['title'] ?>
        </a>
    <?php } ?>
</div>
