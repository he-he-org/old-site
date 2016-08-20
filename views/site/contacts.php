<?php

use app\assets\ContactsAsset;


$this->title = 'Health & Help - ' . \Yii::t('strings', 'layout/main-menu/contacts');

ContactsAsset::register($this);


?>

<h1><?= \Yii::t('strings', 'contacts/title') ?></h1>

<?php $items = [
    ['title' =>  \Yii::t('strings', 'contacts/main-e-mail'), 'value' => 'mailbox@he-he.org'],
]?>

<?php foreach($items as $item) {?>
    <p class="email">
        <span class="email_title">
            <span class="text"><?= $item['title'] ?></span>
            <span  class="fill">............................................................................................................................................................................................</span>
        </span>
        <span class="email_value"><a href="mailto:<?= $item['value'] ?>"><?= $item['value'] ?></a></span>
    </p>
<?php } ?>


<h3><?= Yii::t('strings', 'contacts/boxes/common/title') ?></h3>


<?php $items = [
    ['title' => Yii::t('strings', 'contacts/boxes/common/donations'), 'value' => 'donation@he-he.org'],
    ['title' => Yii::t('strings', 'contacts/boxes/common/packages'), 'value' => 'parcel@he-he.org'],
    ['title' => Yii::t('strings', 'contacts/boxes/common/sponsorship'), 'value' => 'sponsorship@he-he.org'],
    ['title' => Yii::t('strings', 'contacts/boxes/common/volunteering'), 'value' => 'volunteer@he-he.org'],
    ['title' => Yii::t('strings', 'contacts/boxes/common/press-and-media'), 'value' => 'media@he-he.org'],
    ['title' => Yii::t('strings', 'contacts/boxes/common/partnership'), 'value' => 'partners@he-he.org'],
]?>

<?php foreach($items as $item) {?>
    <p class="email">
        <span class="email_title">
            <span class="text"><?= $item['title'] ?></span>
            <span  class="fill">............................................................................................................................................................................................</span>
        </span>
        <span class="email_value"><a href="mailto:<?= $item['value'] ?>"><?= $item['value'] ?></a></span>
    </p>
<?php } ?>


<h3><?= Yii::t('strings', 'contacts/boxes/personal/title') ?></h3>


<?php $items = [
    ['title' => Yii::t('strings', 'contacts/boxes/personal/1'), 'value' => 'viktoriya.valikova@gmail.com'],
    ['title' => Yii::t('strings', 'contacts/boxes/personal/2'), 'value' => 'sergiocastillomed@outlook.com'],
    ['title' => Yii::t('strings', 'contacts/boxes/personal/3'), 'value' => 'kr.basharova@gmail.com'],
    ['title' => Yii::t('strings', 'contacts/boxes/personal/4'), 'value' => 'nimimi@yandex.ru'],
    ['title' => Yii::t('strings', 'contacts/boxes/personal/5'), 'value' => 'larisa.v.melnikova@gmail.com'],
]?>

<?php foreach($items as $item) {?>
    <p class="email">
        <span class="email_title">
            <span class="text"><?= $item['title'] ?></span>
            <span  class="fill">............................................................................................................................................................................................</span>
        </span>
        <span class="email_value"><a href="mailto:<?= $item['value'] ?>"><?= $item['value'] ?></a></span>
    </p>
<?php } ?>






