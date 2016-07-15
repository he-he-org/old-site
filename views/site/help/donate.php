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


        <!-- Получатель (тестовый кошелек): --> <input type="hidden" name="receiver" value="410012180500847" />
        <!-- Название перевода на странице подтверждения: --> <input type="hidden" name="formcomment" value="Проект «Health &amp; Help»" />
        <!-- Название перевода в истории отправителя: --> <input type="hidden" name="short-dest" value="Проект «Health &amp; Help»" />
        <!-- Тип транзакции: --> <input type="hidden" name="quickpay-form" value="donate" data-role="" />
        <!-- Назначение платежа: --> <input type="hidden" name="targets" value="Пожертвование на уставные цели" />
        <!-- Способ оплаты: --> <input type="hidden" readonly="readonly" name="paymentType" value="PC" data-type="string"  data-role="hidden-paymentType"/>
        <input type="hidden" readonly="readonly" name="sum" value="" data-type="number" data-role="hidden-sum" />
    </form>

    
    <?php 
    
    $data = [
        [
            'amount' => '300',
            'for-us' => [
                'Одна поездка на такси',
                'Один поход в Макдональдс',
                'Несколько пачек сигарет',
            ],
            'for-them' => [
                'Обработка ран и антибиотикопрофилактика для двух пациентов',
            ]
        ],
        [
            'amount' => '500',
            'for-us' => [
                'Пара билетов в кино',
                'Пара чашек кофе',
                'Бутылка вина',
            ],
            'for-them' => [
                'Проверка 75 пациентов на паразитарные инфекции',
            ]
        ],
        [
            'amount' => '1000',
            'for-us' => [
                'Пара билетов на квест',
                'Пара коктейлей в баре',
            ],
            'for-them' => [
                'Установка внутриматочных спиралей трем женщинам',
                'Проверка шестнадцати пациентов на туберкулез',
                'Поддерживающие лекарства на месяц для пяти больных диабетом',
            ],
        ],
    ]
    
    ?>
    
    <div class="section-donate-info row_block-5" date-role="info">
        
        <?php foreach($data as $i => $entry) {?>

            <div  class="section-donate-info_block <?= $i !== 1 ? 'hidden' : '' ?>" date-value="<?= $entry['amount'] ?>">
                <div class="section-donate-info_amount"><?= $entry['amount'] ?> ₽</div>
                <div class="section-donate-info_title">Для них</div>
                <div class="section-donate-info_desc-container">
                    <?php foreach($entry['for-us'] as $j => $value) { ?>
                        <div class="section-donate-info_desc <?= $j !== 0 ? 'hidden' : ''?>"><?= $value ?></div>
                    <?php } ?>
                </div>
                <div class="section-donate-info_title">Для вас</div>
                <div class="section-donate-info_desc-container">
                    <?php foreach($entry['for-them'] as $j => $value) { ?>
                        <div class="section-donate-info_desc <?= $j !== 0 ? 'hidden' : ''?>"><?= $value ?></div>
                    <?php } ?>
                </div>
            </div>

        <?php } ?>
        
        <div  class="section-donate-info_block hidden" date-value="free">
        </div>
    </div>

</div>

