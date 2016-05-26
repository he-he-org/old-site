<?php
use yii\helpers\Url;
?>

<div class="layout-navigation-menu row_block-8">
    <?php foreach ($items as $item) { ?>
        <a class="layout-navigation-menu_item <?=(('/'.Yii::$app->request->pathinfo) === Url::to([$item['url']])) ? 'layout-navigation-menu_item--active' : ''?>" href="<?=Url::to([$item['url']])?>"><?= $item['title'] ?></a>
    <?php } ?>
</div>
