<?php
use yii\helpers\Url;
use app\helpers\RouteHelper;

?>


<div class="row_block-12 help-options">
    <?php foreach ($items as $item) { ?>
        <?php $isActive = Yii::$app->request->getSectionPart(0, 'package') === $item['section'] ?>


        <a class="help-options_option<?= $isActive ? ' help-options_option--active' : '' ?>"
           href="<?= Url::toRoute(["help/${item['section']}"]) ?>">
            <div class="help-options_icon"><img src="<?= $item['icon_url'] ?>"/></div>
            <div class="help-options_title">
                    <?= $item['title'] ?>
            </div>
        </a>
    <?php } ?>
</div>
