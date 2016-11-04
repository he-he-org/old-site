<?php
use yii\helpers\Url;

?>

<div class="row_block-12 layout-submenu">
    <?php foreach ($items as $item) { ?>
        <?php
            $page = isset($item['page']) ? $item['page'] : Yii::$app->request->getPage();
            $section = isset($item['section']) ? $item['section'] : Yii::$app->request->getSectionPart(0);
            $href = Url::toRoute([
                $page,
                'section' => $section,
            ]);
            $isActive = isset($item['is_active'])
                ? $item['is_active']
                : $section === Yii::$app->request->getSectionPart(0)
//            $isActive = isset($item['section'])
//                ? Yii::$app->request->getSectionPart(0, 'package') === $item['section']
//                : false;
//            $href = isset($item['url']) ? $href = $item['url'] : Url::toRoute(["help/${item['section']}"]);
        ?>

        <a class="layout-submenu_option<?= $isActive ? ' layout-submenu_option--active' : '' ?>"
           href="<?= $href ?>">
            <div class="layout-submenu_icon"><img src="<?= $item['icon_url'] ?>"/></div>
            <div class="layout-submenu_title">
                    <?= $item['title'] ?>
            </div>
        </a>
    <?php } ?>
</div>
