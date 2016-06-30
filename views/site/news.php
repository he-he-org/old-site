<?php

use app\assets\NewsAsset;


$pageName = 'News';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Новости';
}

$this->title = 'Health & Help - ' . $pageName;

NewsAsset::register($this);

?>

<div class="row">
    <div class="row_block-9">
        <?php foreach ($news as $item) { ?>
            <div class="item">
                <div class="item_image"><img src="<?= $item['image_url'] ?>"/> </div>
                <div class="item_info">
                    <div class="item_date"><?= date('d.m.Y', $item['date']) ?></div>
                    <div class="item_title"><?= $item['title'] ?></div>
                    <div class="item_text"><?= $item['text'] ?></div>
                    <div class="item_tags">Теги:
                        <?php foreach ($item['tags'] as $tag) { ?>
                            <div class="item_tag"><?= $tag ?></div>
                        <?php }?>
                    </div>
                </div>
            </div>
        <?php } ?>
    </div>
    <div class="row_block-2 tags">
        <div class="tags_title">Теги</div>
        <?php foreach ($tags as $tag) { ?>
            <div class="tags_tag"><?= $tag ?></div>
        <?php } ?>
    </div>
</div>

