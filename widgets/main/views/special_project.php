<?php
use yii\helpers\Url;
?>
<div id="<?= $anchor ?>"  class="special-project special-project--<?= $modifier ?>">
    <div class="special-project_top">
        <div class="special-project_left">
            <div class="special-project_title">
                <?= $title ?>
                <a class="fa fa-link special-project_anchor-link" href="#<?= $anchor ?>"  aria-hidden="true"></a>
            </div>
            <p class="special-project_description"><?= $desc ?></p>
        </div>
        <div class="special-project_right">
            <?php if (count($news) > 0) { ?>
                <div class="special-project_news">
                    <a class="special-project_news-header" href="<?= Url::toRoute(["news", "tag" => $news_tag_id]) ?>">
                        <?= \Yii::t('strings', 'main/special-project/news-title') ?>
                    </a>
                    <ol class="special-project_news-list">
                        <?php foreach ($news as $news_item) { ?>
                            <li class="special-project_news-item"><?= $news_item ?></li>
                        <?php } ?>
                    </ol>
                </div>
            <?php } ?>
        </div>
    </div>


    <div class="special-project_bottom">
        <form class="special-project_donate" action="https://money.yandex.ru/quickpay/confirm.xml">
            <!-- Получатель (тестовый кошелек): --> <input type="hidden" name="receiver" value="410012180500847" />
            <!-- Название перевода на странице подтверждения: --> <input type="hidden" name="formcomment" value="<?= str_replace('{project}', $title, \Yii::t('strings', 'main/special-project/formcomment-template')) ?>" />
            <!-- Название перевода в истории отправителя: --> <input type="hidden" name="short-dest" value="<?= \Yii::t('strings', 'main/special-project/short-dest') ?>" />
            <!-- Тип транзакции: --> <input type="hidden" name="quickpay-form" value="donate" />
            <!-- Назначение платежа: --> <input type="hidden" name="targets" value="<?= \Yii::t('strings', 'main/special-project/targets') ?>" />
            <!-- Способ оплаты: --> <input type="hidden" readonly="readonly" name="paymentType" value="PC" data-type="string" />

            <!-- Сумма: --> <input type="hidden" readonly="readonly" name="sum" value="" data-type="number" />

            <!-- Метка перевода (внутренний id приложения):  <input type="hidden" name="label" value="-1" />-->
            <!-- Комментарий отправителя перевода: <input type="hidden" name="comment" value="-1" />-->
            <!-- Обратный адрес: <input type="hidden" name="successURL" value="http://new.he-he.org/site/donation_done" data-type="text" />-->
            <!-- Запрос ФИО отправителя:  <input type="hidden" name="need-fio" value="true" />-->
            <!-- Запрос email отправителя: <input type="hidden" name="need-email" value="true" />-->
            <!-- Запрос телефона отправителя: <input type="hidden" name="need-phone" value="true" />-->
            <!-- Запрос адреса отправителя: <input type="hidden" name="need-address" value="true" />-->

            <input value="1 000 ₽" class="special-project_donate-amount"/>

            <button class="special-project_donate-button"><?= \Yii::t('strings', 'main/special-project/donate-button-title') ?></button>
        </form>
        <div class="special-project_links">
            <?php if ($details_url !== null) { ?>
                <a class="special-project_link-button" href="<?= $details_url ?>"><?= \Yii::t('strings', 'main/special-project/more-title') ?></a>
            <?php } ?>
        </div>
    </div>
</div>
