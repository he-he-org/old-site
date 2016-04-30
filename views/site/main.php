<?php

//
// TODO: add localization EN, RU
//
$pageName = 'Main';

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

