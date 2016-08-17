<form class="packages_item package" action="https://money.yandex.ru/quickpay/confirm.xml">
    <!-- Получатель (тестовый кошелек): --> <input type="hidden" name="receiver" value="410012180500847" />
    <!-- Название перевода на странице подтверждения: --> <input type="hidden" name="formcomment" value="Health &amp; Help: готовый набор «<?= $title ?>»" />
    <!-- Название перевода в истории отправителя: --> <input type="hidden" name="short-dest" value="Health &amp; Help: готовый набор «<?= $title ?>»" />
    <!-- Тип транзакции: --> <input type="hidden" name="quickpay-form" value="donate" />
    <!-- Назначение платежа: --> <input type="hidden" name="targets" value="<?= \Yii::t('strings', 'help/prepared-package/targets') ?>" />
    <!-- Способ оплаты: --> <input type="hidden" readonly="readonly" name="paymentType" value="PC" data-type="string" />

    <!-- Сумма: --> <input type="hidden" readonly="readonly" name="sum" value="<?= $cost ?>" data-type="number" />

    <!-- Метка перевода (внутренний id приложения):  <input type="hidden" name="label" value="-1" />-->
    <!-- Комментарий отправителя перевода: <input type="hidden" name="comment" value="-1" />-->
    <!-- Обратный адрес: <input type="hidden" name="successURL" value="http://new.he-he.org/site/donation_done" data-type="text" />-->
    <!-- Запрос ФИО отправителя:  <input type="hidden" name="need-fio" value="true" />-->
    <!-- Запрос email отправителя: <input type="hidden" name="need-email" value="true" />-->
    <!-- Запрос телефона отправителя: <input type="hidden" name="need-phone" value="true" />-->
    <!-- Запрос адреса отправителя: <input type="hidden" name="need-address" value="true" />-->

    <!--    <input value="1000 ₽" class="common-donation_amount" size="1"/>-->

        <div class="package_title"><?= $title ?></div>
        <div class="package_desc"><?= $desc ?></div>
        <div class="package_button">
            <button type="submit" class="send-button"><?= \Yii::t('strings', 'help/kit/donate-button-title') ?> <?= $cost ?> &#8381;</button>
        </div>

</form>

