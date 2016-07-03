<?php
use yii\helpers\Url;
use app\helpers\RouteHelper;

?>

<div class="category-menu">
    <div class="category-menu_body">
        <?php $mainSection = Yii::$app->request->getSectionPart(0, 'package'); ?>
        <?php foreach ($items as $item) { ?>
            <a href="<?= Url::toRoute(["help/$mainSection#${item['section']}"]) ?>" class="category-menu_item">
                <?= $item['title'] ?>
            </a>
        <?php } ?>
    </div>

    <!-- Fix for sticky menu in Chrome, so it doesn't witch. I dont know how it works O_o -->
    <div style="position: fixed; right: 0;bottom: 0;"></div>
</div>
