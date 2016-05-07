<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;


//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Main';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Главная';
}

$this->title = 'Health & Help - ' . $pageName;

?>
<div class="row intro-row">
    <div class="row_block-6 intro">
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
                <input value="1000 ₽" class="common-donation_amount" size="1"/>
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
    <?= TeamMemberWidget::widget(['name' => 'Лариса Мельникова', 'role' => 'Менеджер']) ?>
    <?= TeamMemberWidget::widget(['name' => 'Кристина Башарова', 'role' => 'Менеджер продукта']) ?>
    <?= TeamMemberWidget::widget(['name' => 'Михаил Никифоров', 'role' => 'Менеджер']) ?>
    <?= TeamMemberWidget::widget(['name' => 'Николай Мавренков', 'role' => 'Веб-разработчик']) ?>
    <?= TeamMemberWidget::widget(['name' => 'Анна Дудко', 'role' => 'Менеджер']) ?>
    <?= TeamMemberWidget::widget(['name' => 'Полина Стародубцева', 'role' => 'Главный управляющий проектами']) ?>
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