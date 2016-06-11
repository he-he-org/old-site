<?php

use app\assets\ContactsAsset;


//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Contacts';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Контакты';
}

$this->title = 'Health & Help - ' . $pageName;

ContactsAsset::register($this);


?>

<h1>Контакты</h1>

<?php $items = [
    ['title' => 'Наша почта', 'value' => 'mailbox@he-he.org'],
]?>

<?php foreach($items as $item) {?>
    <p class="email">
        <span class="email_title">
            <span class="text"><?= $item['title'] ?></span>
            <span  class="fill">...........................................................................................................................</span>
        </span>
        <span class="email_value"><a href="mailto:<?= $item['value'] ?>"><?= $item['value'] ?></a></span>
    </p>
<?php } ?>


<h3>Ответим быстрее, если отправите письмо на почту по тематике:</h3>


<?php $items = [
    ['title' => 'Перевод пожертвований', 'value' => 'donation@he-he.org'],
    ['title' => 'Отправка посылок', 'value' => 'parcel@he-he.org'],
    ['title' => 'Спонсорская помощь', 'value' => 'sponsorship@he-he.org'],
    ['title' => 'Волонтерство', 'value' => 'volunteer@he-he.org'],
    ['title' => 'Сотрудничество со СМИ', 'value' => 'media@he-he.org'],
    ['title' => 'Партнерство', 'value' => 'partners@he-he.org'],
]?>

<?php foreach($items as $item) {?>
    <p class="email">
        <span class="email_title">
            <span class="text"><?= $item['title'] ?></span>
            <span  class="fill">...........................................................................................................................</span>
        </span>
        <span class="email_value"><a href="mailto:<?= $item['value'] ?>"><?= $item['value'] ?></a></span>
    </p>
<?php } ?>


<h3>Связаться с участниками команды можно следующим образом:</h3>


<?php $items = [
    ['title' => 'Виктория Валикова (ru)', 'value' => 'viktoriya.valikova@gmail.com'],
    ['title' => 'Сергио Оттониель<br/> Кастийо Мендоза (esp, en)', 'value' => 'sergiocastillomed@outlook.com'],
    ['title' => 'Карина Башарова (ru)', 'value' => 'kr.basharova@gmail.com'],
    ['title' => 'Михаил Никифоров (en, ru)', 'value' => 'nimimi@yandex.ru'],
    ['title' => 'Лариса Мельникова (en, ru)', 'value' => 'larisa.v.melnikova@gmail.com'],
]?>

<?php foreach($items as $item) {?>
    <p class="email">
        <span class="email_title">
            <span class="text"><?= $item['title'] ?></span>
            <span  class="fill">...........................................................................................................................</span>
        </span>
        <span class="email_value"><a href="mailto:<?= $item['value'] ?>"><?= $item['value'] ?></a></span>
    </p>
<?php } ?>






