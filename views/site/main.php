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


?>

<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>

<div class="container">
    <div class="fields">
        <header class="header">
            <img src="/images/logo.png"/>
            <div class="social-networks">
                <div class="social-networks__header">Мы в социальных сетях</div>
            </div>
        </header>

        <div class="row menu-row">
            <div class="navigation-menu row_block-8">
                <div class="navigation-menu_item navigation-menu_item--active">О нас</div>
                <div class="navigation-menu_item">Помочь проекту</div>
                <div class="navigation-menu_item">Стать волонтером</div>
                <div class="navigation-menu_item">Новости</div>
                <div class="navigation-menu_item">Контакты</div>
            </div>
        </div>
        <div class="body">
            <div class="row intro-row">
                <div class="row_block-7 intro">
                    <h1>Благотворительный проект</h1>
                    <p>
                        В проекте Health&Help почти сотня людей объединилась для того, чтобы дать гватемальским индейцам
                        Майя доступ к базовой медицинской помощи. Работаем, чтобы помогать людям, а для покупки
                        лекарств, расходных материалов и оборудования нам нужна ваша помощь. Даже сто рублей могут
                        помочь вылечить человека
                    </p>
                </div>
                <div class="row_block-5 column main-center">
                    <div class="common-donation">
                        <div class="common-donation_top">
                            <input value="1000 ₽" class="common-donation_amount"/>
                            <button class="common-donation_donate-button">Пожертвовать</button>
                        </div>
                        <div class="common-donation_bottom">
                            <div class="common-donation_status">
                                <div class="common-donation_collected-title">Уже собрано</div>
                                <div class="common-donation_collected">1 245 584 ₽</div>
                                <div class="common-donation_boom-link"><a href="#">Проект на boomstarter</a></div>
                            </div>
                            <div class="common-donation_gateway">
                                Платеж через систему<br/>
                                Яндекс-деньги
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="row_block-12 uk-button uk-button-success all-team-link"><a href="#">Вся команда</a></div>
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
    <footer class="footer">
        <div class="fields  row">
            <div class="footer_links-block row_block-3">
                <div class="footer_links-block_header">Задачи</div>
                <div class="footer_links-block_item">Строительство клиники</div>
                <div class="footer_links-block_item">Медикаменты</div>
                <div class="footer_links-block_item">Продукты питания</div>
                <div class="footer_links-block_item">Строительство водопровода</div>
            </div>
            <div class="footer_links-block row_block-3">
                <div class="footer_links-block_header">О проекте</div>
                <div class="footer_links-block_item">Новости</div>
                <div class="footer_links-block_item">Наши спецпроекты</div>
                <div class="footer_links-block_item">Команда проекта</div>
                <div class="footer_links-block_item">История создания</div>
                <div class="footer_links-block_item">На что мы тратим деньги</div>
            </div>
            <div class="footer_links-block row_block-3">
                <div class="footer_links-block_header">Как помочь</div>
                <div class="footer_links-block_item">Внести пожертвование</div>
                <div class="footer_links-block_item">Стать волонтером</div>
                <div class="footer_links-block_item">Отправить посылку</div>
                <div class="footer_links-block_item">Рассказать в соцсетях</div>
                <div class="footer_links-block_item">Написать нам</div>
            </div>
            <div class="row_block-3">
                todo: Мы в социальных сетях
            </div>
        </div>
    </footer>
</div>