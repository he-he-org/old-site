<?php

//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Main';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Главная';
}

$this->title = 'Health & Help - '.$pageName;

//
// TODO: remove js-disabled block at page load.
//
echo <<< JS_DISABLED
    <div class="js-disabled">
        <p> Website requires Javascript to be enabled. </p>
    </div>
JS_DISABLED;

?>
<div id="react-container"></div>
