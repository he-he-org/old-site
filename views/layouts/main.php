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
    <!-- Yandex.Metrika counter --> <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter36532600 = new Ya.Metrika({ id:36532600, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <noscript><div><img src="https://mc.yandex.ru/watch/36532600" style="position:absolute; left:-9999px;" alt="" /></div></noscript> <!-- /Yandex.Metrika counter -->
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
                                <?= \Yii::t('strings', 'layout/follow-us') ?>
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
                        <div class="layout-footer_links-block_header"><?= \Yii::t('strings', 'layout/main/footer/link/goals') ?></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['#crowdfunding-2']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/clinic-construction') ?></a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['help/package#pharmacy']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/medical-supplies') ?></a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['help/package#food']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/food-products') ?></a></div>
<!--                        <div class="layout-footer_links-block_item">Строительство водопровода</div>-->
                    </div>
                    <div class="layout-footer_links-block row_block-3">
                        <div class="layout-footer_links-block_header"><?= \Yii::t('strings', 'layout/main/footer/link/about-healp-and-help') ?></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['news']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/news') ?></a></div>
<!--                        <div class="layout-footer_links-block_item">Наши спецпроекты</div>-->
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['team']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/team') ?></a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['about']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/facts') ?></a></div>
<!--                        <div class="layout-footer_links-block_item">На что мы тратим деньги</div>-->
                    </div>
                    <div class="layout-footer_links-block row_block-3">
                        <div class="layout-footer_links-block_header"><?= \Yii::t('strings', 'layout/main/footer/link/help-the-project') ?></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['help/donate']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/donate-now') ?></a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['volunteers']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/become-a-volunteer') ?></a></div>
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['help/package']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/send-a-package') ?></a></div>
<!--                        <div class="layout-footer_links-block_item">Рассказать в соцсетях</div>-->
                        <div class="layout-footer_links-block_item"><a href="<?= Url::toRoute(['contacts']) ?>"><?= \Yii::t('strings', 'layout/main/footer/link/contact-us') ?></a></div>
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
