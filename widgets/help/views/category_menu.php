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
</div>
