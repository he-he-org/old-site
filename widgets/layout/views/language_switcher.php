<?php
use yii\helpers\Url;
?>

<div class="layout-header_languages">
    <?php
        $page = Yii::$app->request->getPage();
        $section = Yii::$app->request->getSection();
        $lang = Yii::$app->request->getLang();
    ?>

    <div class="layout-header_languages-item"><a href="http://new.he-he.org/ru/">Ru</a></div>
    <div class="layout-header_languages-item"><a href="https://he-he.org/en/">En</a></div>
    <div class="layout-header_languages-item"><a href="https://he-he.org/es/">Es</a></div>
    
    
    <?php /*
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
 */?>
</div>
