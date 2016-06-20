
<div class="row content">
    <form class="section-donate-form row_block-6" action="https://money.yandex.ru/quickpay/confirm.xml">
        <div class="section-donate-form_options" data-role="payment-options">
            <div class="section-donate-form_option section-donate-form_option--active" data-value="AC">Банковская карта</div>
            <div class="section-donate-form_option" data-value="PC">Яндекс-деньги</div>
        </div>
        <div class="section-donate-form_options" data-role="amount-options">
            <div class="section-donate-form_option" data-value="300">300 ₽</div>
            <div class="section-donate-form_option section-donate-form_option--active" data-value="500">500 ₽</div>
            <div class="section-donate-form_option" data-value="1000">1000 ₽</div>
            <div class="section-donate-form_option" data-value="free">Другая сумма</div>
        </div>
        <div class="section-donate-form_amount-info">
            <div class="section-donate-form_amount" data-role="amount">500 ₽</div>
            <div class="section-donate-form_amount-input hidden" data-role="amount-input"><input size="4"/>&nbsp;₽</div>
            <div class="section-donate-form_fee" >
                Будет переведено <span data-role="amount-due">495.02</span> ₽ (коммисия <span data-role="fee">4.98</span> ₽)
            </div>
        </div>
        <button class="section-donate-form_submit" data-role="submit">Пожертвовать</button>


        <!-- Получатель (тестовый кошелек): --> <input type="hidden" name="receiver" value="410012927511965" />
        <!-- Название перевода на странице подтверждения: --> <input type="hidden" name="formcomment" value="Проект «Health &amp; Help»" />
        <!-- Название перевода в истории отправителя: --> <input type="hidden" name="short-dest" value="Проект «Health &amp; Help»" />
        <!-- Тип транзакции: --> <input type="hidden" name="quickpay-form" value="donate" data-role="" />
        <!-- Назначение платежа: --> <input type="hidden" name="targets" value="Пожертвование на уставные цели" />
        <!-- Способ оплаты: --> <input type="hidden" readonly="readonly" name="paymentType" value="PC" data-type="string"  data-role="hidden-paymentType"/>
        <input type="hidden" readonly="readonly" name="sum" value="" data-type="number" data-role="hidden-sum" />
    </form>

    <div class="section-donate-info row_block-5" date-role="info">
        <div  class="section-donate-info_block hidden" date-value="300">
            <div class="section-donate-info_amount">300 ₽</div>
            <div class="section-donate-info_title">Для них</div>
            <div class="section-donate-info_desc">Две упаковки Но-шпы, чтобы облегчить боль нескольким людям</div>
            <div class="section-donate-info_title">Для вас</div>
            <div class="section-donate-info_desc">Один поход в кино</div>
        </div>
        <div  class="section-donate-info_block" date-value="500">
            <div class="section-donate-info_amount">500 ₽</div>
            <div class="section-donate-info_title">Для них</div>
            <div class="section-donate-info_desc">Две упаковки Но-шпы, чтобы облегчить боль нескольким людям</div>
            <div class="section-donate-info_title">Для вас</div>
            <div class="section-donate-info_desc">Один поход в кино</div>
        </div>
        <div  class="section-donate-info_block hidden" date-value="1000">
            <div class="section-donate-info_amount">1000 ₽</div>
            <div class="section-donate-info_title">Для них</div>
            <div class="section-donate-info_desc">Две упаковки Но-шпы, чтобы облегчить боль нескольким людям</div>
            <div class="section-donate-info_title">Для вас</div>
            <div class="section-donate-info_desc">Один поход в кино</div>
        </div>
        <div  class="section-donate-info_block hidden" date-value="free">
        </div>
    </div>

</div>

