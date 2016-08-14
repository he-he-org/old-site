<?php
use yii\helpers\Url;
?>

<div class="widget-main-donate-form">
    <div class="widget-main-donate-form_top">
        <form class="widget-main-donate-form_form" action="https://money.yandex.ru/quickpay/confirm.xml">
            <!-- Получатель (тестовый кошелек): --> <input type="hidden" name="receiver" value="410012180500847" />
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

            <input value="1000 ₽" class="widget-main-donate-form_amount" size="1"/>

            <button type="submit" class="widget-main-donate-form_donate-button"><?= \Yii::t('strings', 'widgets/shared/main-donate-form/button') ?></button>
        </form>
    </div>
    <div class="widget-main-donate-form_middle">
        <div class="widget-main-donate-form_tips hidden"><?= \Yii::t('strings', 'widgets/shared/main-donate-form/tips') ?></div>
    </div>
    <div class="widget-main-donate-form_bottom">
        <div class="widget-main-donate-form_status">
            <div class="widget-main-donate-form_collected-title"><?= \Yii::t('strings', 'widgets/shared/main-donate-form/raised-title') ?></div>
            <div class="widget-main-donate-form_collected">1 888 676 ₽</div>
            <div class="widget-main-donate-form_boom-link">
                <a href="https://www.generosity.com/medical-fundraising/let-s-build-a-clinic-for-locals-in-guatemala">
                    <?= \Yii::t('strings', 'widgets/shared/main-donate-form/raised-link-text') ?>
                </a>
            </div>
        </div>
        <div class="widget-main-donate-form_gateway">
            <?= \Yii::t('strings', 'widgets/shared/main-donate-form/powered-by-part1') ?><br/>
            <?= \Yii::t('strings', 'widgets/shared/main-donate-form/powered-by-part2') ?>
        </div>
    </div>
</div>
