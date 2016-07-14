<?php

/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use app\assets\AppAsset;
use yii\bootstrap\Nav;
use yii\bootstrap\NavBar;
use yii\helpers\Url;
use app\widgets\layout\MainMenu;
use app\widgets\layout\LanguageSwitcher;

AppAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta charset="<?= Yii::$app->charset ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>

    <?php if (!YII_DEBUG) { ?>
    <!-- Yandex.Metrika counter --> <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter38485965 = new Ya.Metrika({ id:38485965, clickmap:true, trackLinks:true, accurateTrackBounce:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/38485965" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->
    <?php } ?>
    
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>
    <link href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css' rel='stylesheet' type='text/css'>
</head>
<body>
    <?php $this->beginBody() ?>

    <main>
        <div class="layout-container">
            <div class="layout-fields">
                <header class="layout-header">
                    <a href="<?= Url::toRoute(["/"]) ?>"><img src="/images/logo.png"/></a>

                    <div class="layout-header_right">
                        <?= LanguageSwitcher::widget(['items' => [
                            ['title' => 'Ru', 'lang' => 'ru'],
                            ['title' => 'En', 'lang' => 'en'],
                            ['title' => 'Es', 'lang' => 'es'],
                        ]]) ?>
                        <div class="layout-header_social-networks">
                            <div class="layout-header_social-networks_title">
                                Мы в социальных сетях
                            </div>
                            <div class="layout-social-networks">
                                <a href="https://www.facebook.com/healthandhelporg/" class="fa fa-facebook layout-social-networks_item" aria-hidden="true"></a>
                                <a href="https://twitter.com/heheorg" class="fa fa-twitter layout-social-networks_item" aria-hidden="true"></a>
                                <a href="https://www.instagram.com/health2help" class="fa fa-instagram layout-social-networks_item" aria-hidden="true"></a>
                                <a href="http://vk.com/heandhe" class="fa fa-vk layout-social-networks_item" aria-hidden="true"></a>
                            </div>
                        </div>
                    </div>
                </header>

                <div class="row layout-menu-row">
                    <?= MainMenu::widget(['items' => [
                        ['page' => 'about', 'title' => 'layout/main-menu/about_us'],
                        ['page' => 'help', 'title' => 'layout/main-menu/help'],
                        ['page' => 'volunteers', 'title' => 'layout/main-menu/volunteers'],
                        ['page' => 'news', 'title' => 'layout/main-menu/news'],
                        ['page' => 'contacts', 'title' => 'layout/main-menu/contacts'],
                    ]]) ?>
                </div>
                <div class="layout-content">
                    <?= $content ?>
                </div>
            </div>
        </div>
    </main>
    <footer>
        <div class="layout-footer">
            <div class="layout-fields">
                <div class="row">
                    <div class="layout-footer_links-block row_block-3">
                        <div class="layout-footer_links-block_header">Задачи</div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['#crowdfunding-2']) ?>">Строительство клиники</a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['help/package#pharmacy']) ?>">Медикаменты</a></div> 
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['help/package#food']) ?>">Продукты питания</a></div>
<!--                        <div class="layout-footer_links-block_item">Строительство водопровода</div>-->
                    </div>
                    <div class="layout-footer_links-block row_block-3">
                        <div class="layout-footer_links-block_header">О проекте</div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['news']) ?>">Новости</a></div>
<!--                        <div class="layout-footer_links-block_item">Наши спецпроекты</div>-->
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['team']) ?>">Команда проекта</a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['about']) ?>">История создания</a></div>
<!--                        <div class="layout-footer_links-block_item">На что мы тратим деньги</div>-->
                    </div>
                    <div class="layout-footer_links-block row_block-3">
                        <div class="layout-footer_links-block_header">Как помочь</div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['help/donate']) ?>">Внести пожертвование</a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['volunteers']) ?>">Стать волонтером</a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['help/package']) ?>">Отправить посылку</a></div>
<!--                        <div class="layout-footer_links-block_item">Рассказать в соцсетях</div>-->
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['contacts']) ?>">Написать нам</a></div>
                    </div>
                    <div class="row_block-3">
                        <div class="layout-social-networks">
                            <a href="https://www.facebook.com/healthandhelporg/" class="fa fa-facebook layout-social-networks_item" aria-hidden="true"></a>
                            <a href="https://twitter.com/heheorg" class="fa fa-twitter layout-social-networks_item" aria-hidden="true"></a>
                            <a href="https://www.instagram.com/health2help" class="fa fa-instagram layout-social-networks_item" aria-hidden="true"></a>
                            <a href="http://vk.com/heandhe" class="fa fa-vk layout-social-networks_item" aria-hidden="true"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>

    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
