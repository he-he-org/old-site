<div class="row content">
    <form class="section-donate-form row_block-6" action="https://money.yandex.ru/quickpay/confirm.xml">
        <div class="section-donate-form_options" data-role="payment-options">
            <div class="section-donate-form_option section-donate-form_option--active" data-value="AC"><?= \Yii::t('strings', 'help/donate/payment-options/card') ?></div>
            <div class="section-donate-form_option" data-value="PC"><?= \Yii::t('strings', 'help/donate/payment-options/ym') ?></div>
        </div>
        <div class="section-donate-form_options" data-role="amount-options">
            <div class="section-donate-form_option" data-value="300">300 ₽</div>
            <div class="section-donate-form_option section-donate-form_option--active" data-value="500">500 ₽</div>
            <div class="section-donate-form_option" data-value="1000">1000 ₽</div>
            <div class="section-donate-form_option" data-value="free"><?= \Yii::t('strings', 'help/donate/amount-options/other-amount') ?></div>
        </div>
        <div class="section-donate-form_amount-info">
            <div class="section-donate-form_amount" data-role="amount">500 ₽</div>
            <div class="section-donate-form_amount-input hidden" data-role="amount-input"><input size="4"/>&nbsp;₽</div>
            <div class="hidden" data-role="fee-info-template"><?= \Yii::t('strings', 'help/donate/fee-info-template') ?></div>
            <div class="section-donate-form_fee" data-role="fee-info"></div>
        </div>
        <button class="section-donate-form_submit" data-role="submit"><?= \Yii::t('strings', 'help/donate/donate-button-title') ?></button>


        
        
        
        <!-- Получатель (тестовый кошелек): --> <input type="hidden" name="receiver" value="410012180500847" />
        <!-- Название перевода на странице подтверждения: --> <input type="hidden" name="formcomment" value="<?= \Yii::t('strings', 'help/donate/formcomment') ?>" />
        <!-- Название перевода в истории отправителя: --> <input type="hidden" name="short-dest" value="<?= \Yii::t('strings', 'help/donate/short-dest') ?>" />
        <!-- Тип транзакции: --> <input type="hidden" name="quickpay-form" value="donate" data-role="" />
        <!-- Назначение платежа: --> <input type="hidden" name="targets" value="<?= \Yii::t('strings', ' help/donate/targets') ?>" />
        <!-- Способ оплаты: --> <input type="hidden" readonly="readonly" name="paymentType" value="PC" data-type="string"  data-role="hidden-paymentType"/>
        <input type="hidden" readonly="readonly" name="sum" value="" data-type="number" data-role="hidden-sum" />
    </form>


    <?php

    $data = [
        [
            'amount' => '300',
            'for-us' => [
                \Yii::t('strings', 'help/donate/info/300/for-us/options/1'),
                \Yii::t('strings', 'help/donate/info/300/for-us/options/2'),
                \Yii::t('strings', 'help/donate/info/300/for-us/options/3'),
            ],
            'for-them' => [
                \Yii::t('strings', 'help/donate/info/300/for-them/options/1'),
            ]
        ],
        [
            'amount' => '500',
            'for-us' => [
                \Yii::t('strings', 'help/donate/info/500/for-us/options/1'),
                \Yii::t('strings', 'help/donate/info/500/for-us/options/2'),
                \Yii::t('strings', 'help/donate/info/500/for-us/options/3'),
            ],
            'for-them' => [
                \Yii::t('strings', 'help/donate/info/500/for-them/options/1'),
            ]
        ],
        [
            'amount' => '1000',
            'for-us' => [
                \Yii::t('strings', 'help/donate/info/1000/for-us/options/1'),
                \Yii::t('strings', 'help/donate/info/1000/for-us/options/2'), 
            ],
            'for-them' => [
                \Yii::t('strings', 'help/donate/info/1000/for-them/options/1'),
                \Yii::t('strings', 'help/donate/info/1000/for-them/options/2'),
                \Yii::t('strings', 'help/donate/info/1000/for-them/options/3'),
            ],
        ],
    ]

    ?>

    <div class="section-donate-info row_block-5" date-role="info">

        <?php foreach($data as $i => $entry) {?>

            <div  class="section-donate-info_block <?= $i !== 1 ? 'hidden' : '' ?>" date-value="<?= $entry['amount'] ?>">
                <div class="section-donate-info_amount"><?= $entry['amount'] ?> ₽</div>
                <div class="section-donate-info_title"><?= \Yii::t('strings', 'help/donate/info/for-us/title') ?></div>
                <div class="section-donate-info_desc-container">
                    <?php foreach($entry['for-us'] as $j => $value) { ?>
                        <div class="section-donate-info_desc <?= $j !== 0 ? 'hidden' : ''?>"><?= $value ?></div>
                    <?php } ?>
                </div>
                <div class="section-donate-info_title"><?= \Yii::t('strings', 'help/donate/info/for-them/title') ?></div>
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

