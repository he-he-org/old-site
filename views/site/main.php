<?php

use app\widgets\main\PersonWidget;
use app\widgets\main\SpecialProject;


//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Main';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Главная';
}

$this->title = 'Health & Help - '.$pageName;

//
// TODO: remove js-disabled block at page load.
//
echo <<< JS_DISABLED
    <div class="js-disabled">
        <p> Website requires Javascript to be enabled. </p>
    </div>
JS_DISABLED;

?>

<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>

<div class="container">
    <div class="fields">
        <header class="header">
            <img src="/logo.png"/>
            <div class="social-networks">
                <div class="social-networks__header">Мы в социальных сетях</div>
            </div>
        </header>
    </div>
    <div class="main-menu row main-center">
        <div class="fields row">
            <div class="navigation-menu row_block-8">
                <div class="navigation-menu_item">О нас</div>
                <div class="navigation-menu_item">Помочь проекту</div>
                <div class="navigation-menu_item">Стать волонтером</div>
                <div class="navigation-menu_item">Новости</div>
                <div class="navigation-menu_item">Контакты</div>
            </div>
            <div class="language-switch row_block-3">
                <div class="language-switch_item">Русский</div>
                <div class="language-switch_item">English</div>
                <div class="language-switch_item">Español</div>
            </div>
        </div>
    </div>
    <div class="fields">
        <div class="body">
            <div class="row intro-row">
                <div class="row_block-9 intro">
                    <h1>Благотворительный проект</h1>
                    <p>
                        В проекте Health&Help почти сотня людей объединилась для того, чтобы дать гватемальским индейцам
                        Майя доступ к базовой медицинской помощи. Работаем, чтобы помогать людям, а для покупки
                        лекарств, расходных материалов и оборудования нам нужна ваша помощь. Даже сто рублей могут
                        помочь вылечить человека
                    </p>
                </div>
                <div class="row_block-3 column main-center">
                    <div class="collected">
                        <div class="collected_header">На проект уже собрано</div>
                        <div class="collected_amount">1 245 548 ₽</div>
                        <button>Пожертвовать</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <?= PersonWidget::widget(['name' => 'Лариса Мельникова', 'role' => 'Менеджер']) ?>
                <?= PersonWidget::widget(['name' => 'Кристина Башарова', 'role' => 'Менеджер продукта']) ?>
                <?= PersonWidget::widget(['name' => 'Михаил Никифоров', 'role' => 'Менеджер']) ?>
                <?= PersonWidget::widget(['name' => 'Николай Мавренков', 'role' => 'Веб-разработчик']) ?>
                <?= PersonWidget::widget(['name' => 'Анна Дудко', 'role' => 'Менеджер']) ?>
                <?= PersonWidget::widget(['name' => 'Полина Стародубцева', 'role' => 'Главный управляющий проектами']) ?>
            </div>
            <div class="row">
                <button class="row_block-12 uk-button uk-button-success all-team-button">Вся команда</button>
            </div>
            <div class="row">
                <h2>Наши спецпроекты</h2>
            </div>
            <div class="row">
                <?= SpecialProject::widget([
                    'title' => 'Cтроительство клиники',
                    'modifier' => 'green',
                    'desc' => 'В округе нет чистой воды, пригодной для питья, нам необходимо создать  водопровод и очистные сооружения.',
                    'news' => [
                        'Готов фундамент для здания клиники',
                        'Доставлено 350 упаковок лекарств',
                        'Вылечено пятеро детей',
                        'В спонсоры вошел Сбербанк',
                    ]
                ]) ?>
            </div>
            <div class="row">
                <?= SpecialProject::widget([
                    'title' => 'Прокладка водопровода',
                    'modifier' => 'blue',
                    'desc' => 'В округе нет чистой воды, пригодной для питья, нам необходимо создать  водопровод и очистные сооружения.',
                    'news' => [
                        'Готов фундамент для здания клиники',
                        'Доставлено 350 упаковок лекарств',
                        'Произошло что-то невероятное',
                        'Вылечено пятеро детей',
                        'В спонсоры вошел Сбербанк',
                    ]
                ]) ?>
            </div>
            <div class="row">
                <?= SpecialProject::widget([
                    'title' => 'Гуманитарная помощь',
                    'modifier' => 'red',
                    'desc' => 'Медикаменты, продукты, одежда. Мы хотим обеспечить максимальное количество людей хотя бы минимальным количество еды.',
                    'news' => [
                        'Готов фундамент для здания клиники',
                        'Доставлено 350 упаковок лекарств',
                        'В спонсоры вошел Сбербанк',
                    ]
                ]) ?>
            </div>
        </div>
    </div>
</div>