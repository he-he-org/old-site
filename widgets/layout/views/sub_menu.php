<?php
use yii\helpers\Url;

?>

<div class="row_block-12 layout-submenu">
    <?php foreach ($items as $item) { ?>
        <?php
            $urlPage = Yii::$app->request->getPage($default_page);
            $urlSection = Yii::$app->request->getSectionPart(0, $default_section);

            $itemPage = isset($item['page']) ? $item['page'] : $urlPage;
            $itemSection = isset($item['section']) ? $item['section'] : $urlSection;

            $isActive = $urlPage === $itemPage && $urlSection === $itemSection;

            $href = Url::toRoute([
                $itemPage,
                'section' => $itemSection,
            ]);
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
