<?php
use yii\helpers\Url;
use app\helpers\RouteHelper;

function startsWith($str, $prefix) {
    return $prefix === "" || strrpos($str, $prefix, -strlen($str)) !== false;
}

?>

<div class="layout-navigation-menu row_block-8">
    <?php foreach ($items as $item) { ?>
        <?php $isActive = RouteHelper::getPage(Yii::$app->request->pathinfo, 'main') ===  RouteHelper::getPage(Url::toRoute([$item['url']])) ?>
        <a class="layout-navigation-menu_item <?= $isActive ? 'layout-navigation-menu_item--active' : ''?>" href="<?=Url::toRoute([$item['url']])?>"><?= $item['title'] ?></a>
    <?php } ?>
</div>
