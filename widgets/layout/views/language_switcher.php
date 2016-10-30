<?php
use yii\helpers\Url;
?>

<div class="layout-header_languages">
    <?php
        $page = Yii::$app->request->getPage();
        $section = Yii::$app->request->getSectionPart(0, '');
        $subsection = Yii::$app->request->getSectionPart(1, '');
        $lang = Yii::$app->request->getLang();
    ?>
    <?php foreach($items as $item) { ?>
        <?php
            $href = Url::toRoute([
                $page,
                'section' => $section,
                'subsection' => $subsection,
                'lang' => $item['lang']
            ]);
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
