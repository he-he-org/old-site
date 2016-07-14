<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;
use app\assets\MainAsset;
use yii\helpers\Url;

//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Main';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Главная';
}

$this->title = 'Health & Help - ' . $pageName;

MainAsset::register($this);

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
    <div class="row_block-5">
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
                    <div class="common-donation_collected">1 888 676 ₽</div>
                    <div class="common-donation_boom-link"><a href="https://www.generosity.com/medical-fundraising/let-s-build-a-clinic-for-locals-in-guatemala">Проект на Generosity</a></div>
                </div>
                <div class="common-donation_gateway">
                    Платеж через систему<br/>
                    Яндекс-деньги
                </div>
            </div>
        </div>
    </div>
</div>
<div class="row  all-members-link-row">
    <a href="<?= Url::toRoute(['team']) ?>">Вся команда</a>
</div>
<div class="row team-row">
    <?php foreach ($members as $member ) {?>
        <?= TeamMemberWidget::widget($member) ?>
    <?php } ?>
</div>
<div class="row special-projects-title-row">Наши спецпроекты</div>

<?php foreach ($specialProjects as $specialProject) { ?>
    <div class="row">
        <?= SpecialProject::widget($specialProject) ?>
    </div>
<?php } ?>
