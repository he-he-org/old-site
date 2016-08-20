<?php
use yii\helpers\Url;
?>

<div class="layout-header_languages">
    <?php
        $page = Yii::$app->request->getPage();
        $section = Yii::$app->request->getSection();
        $lang = Yii::$app->request->getLang();
    ?>
    <?php foreach($items as $item) { ?>
        <?php
            $href = Url::toRoute([$page, 'section' => $section, 'lang' => $item['lang']]);
            $classes = 'layout-header_languages-item';
            $classes .= ($lang === $item['lang']) ? ' layout-header_languages-item--active' : '';
        ?>
        <div class="<?= $classes ?>">
            <a href="<?=  $href ?>">
                <?= $item['title'] ?>
            </a>
        </div>
    <?php } ?>
</div>
