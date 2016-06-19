<?php
use yii\helpers\Url;
use app\helpers\RouteHelper;

?>


<div class="row_block-12 help-options">
    <?php foreach ($items as $item) { ?>
        <?php
            $isActive = isset($item['section'])
                ? Yii::$app->request->getSectionPart(0, 'package') === $item['section']
                : false;
            $href = isset($item['url']) ? $href = $item['url'] : Url::toRoute(["help/${item['section']}"]);
        ?>


        <a class="help-options_option<?= $isActive ? ' help-options_option--active' : '' ?>"
           href="<?= $href ?>">
            <div class="help-options_icon"><img src="<?= $item['icon_url'] ?>"/></div>
            <div class="help-options_title">
                    <?= $item['title'] ?>
            </div>
        </a>
    <?php } ?>
</div>
