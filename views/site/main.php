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
                <form class="common-donation_form" action="https://money.yandex.ru/quickpay/confirm.xml">
                    <!-- Получатель (тестовый кошелек): --> <input type="hidden" name="receiver" value="410012927511965" />
                    <!-- Название перевода на странице подтверждения: --> <input type="hidden" name="formcomment" value="Проект «Health &amp; Help»" />
                    <!-- Название перевода в истории отправителя: --> <input type="hidden" name="short-dest" value="Проект «Health &amp; Help»" />
                    <!-- Тип транзакции: --> <input type="hidden" name="quickpay-form" value="donate" />
                    <!-- Назначение платежа: --> <input type="hidden" name="targets" value="Пожертвование на уставные цели" />
                    <!-- Способ оплаты: --> <input type="hidden" readonly="readonly" name="paymentType" value="PC" data-type="string" />

                    <!-- Сумма: --> <input type="hidden" readonly="readonly" name="sum" value="" data-type="number" />

                    <!-- Метка перевода (внутренний id приложения):  <input type="hidden" name="label" value="-1" />-->
                    <!-- Комментарий отправителя перевода: <input type="hidden" name="comment" value="-1" />-->
                    <!-- Обратный адрес: <input type="hidden" name="successURL" value="http://new.he-he.org/site/donation_done" data-type="text" />-->
                    <!-- Запрос ФИО отправителя:  <input type="hidden" name="need-fio" value="true" />-->
                    <!-- Запрос email отправителя: <input type="hidden" name="need-email" value="true" />-->
                    <!-- Запрос телефона отправителя: <input type="hidden" name="need-phone" value="true" />-->
                    <!-- Запрос адреса отправителя: <input type="hidden" name="need-address" value="true" />-->

                    <input value="1000 ₽" class="common-donation_amount" size="1"/>

                    <button type="submit" class="common-donation_donate-button">Пожертвовать</button>
                </form>
            </div>
            <div class="common-donation_middle">
                <div class="common-donation_tips"></div>
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