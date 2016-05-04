<?php
use app\widgets\main\PersonWidget;
?>

<div class="special-project special-project--<?= $modifier ?>">
    <div class="special-project_top">
        <div class="special-project_left">
            <h1><?= $title ?></h1>
            <p><?= $desc ?></p>
        </div>
        <div class="special-project_right">
            <div class="special-project_news">
                <div class="special-project_news-header">Новости</div>
                <ol class="special-project_news-list">
                    <?php foreach ($news as $news_item) { ?>
                        <li class="special-project_news-item"><?= $news_item ?></li>
                    <?php } ?>
                </ol>
            </div>
        </div>
    </div>
    <div class="special-project_bottom">
        <div class="special-project_donate">
            <input value="1 000 ₽" class="special-project_donate-amount"/>
            <button class="special-project_donate-button">Пожертвовать</button>
        </div>
        <div class="special-project_links">
            <button class="special-project_link-button">Как помочь</button>
            <button class="special-project_link-button">План развития</button>
        </div>
    </div>
</div>