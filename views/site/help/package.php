<?php

use app\widgets\help\CategoryMenu;
use app\widgets\help\PreparedPackage;

?>
<div class="row">
    <div class="row_block-3">
        <!-- todo: make a proper translation -->
        <?= CategoryMenu::widget(['items' => [
            ['title' => Yii::t('strings', 'help/package/category/medical-supplies'), 'section' => 'medical-supplies'],
            ['title' => Yii::t('strings', 'help/package/category/promotional-products'), 'section' => 'promotional-products'],
            ['title' => Yii::t('strings', 'help/package/category/household-products'), 'section' => 'household-products'],
            ['title' => Yii::t('strings', 'help/package/category/linen'), 'section' => 'linen'],
            ['title' => Yii::t('strings', 'help/package/category/clothing-and-footwear'), 'section' => 'clothing-and-footwear'],
            ['title' => Yii::t('strings', 'help/package/category/hygienic-products'), 'section' => 'hygienic-products'],
            ['title' => Yii::t('strings', 'help/package/category/musical-instruments'), 'section' => 'musical-instruments'],
            ['title' => Yii::t('strings', 'help/package/category/childcare-products'), 'section' => 'childcare-products'],
            ['title' => Yii::t('strings', 'help/package/category/groceries'), 'section' => 'groceries'],
            ['title' => Yii::t('strings', 'help/package/category/books'), 'section' => 'books'],
            ['title' => Yii::t('strings', 'help/package/category/other'), 'section' => 'other'],
        ]]) ?>
    </div>


    <div class="row_block-9">

            <span  id="medical-supplies"></span>
            <?= Yii::t('texts/help', 'help/pharmacy/part1') ?>


            <div class="packages">
                <?= PreparedPackage::widget([
                    'title' => Yii::t('strings', 'help/kits/minimal/title'),
                    'desc' => [
                        \Yii::t('strings', 'help/kit/minimal/options/1'),
                        \Yii::t('strings', 'help/kit/minimal/options/2'),
                        \Yii::t('strings', 'help/kit/minimal/options/3'),
                    ][rand (0, 2)],
                    'cost' => Yii::$app->i18n->getCurrencySetting('donationOption2'),
                ]) ?>
                <?= PreparedPackage::widget([
                    'title' => Yii::t('strings', 'help/kits/medium/title'),
                    'desc' => [
                        \Yii::t('strings', 'help/kits/medium/options/1'),
                        \Yii::t('strings', 'help/kits/medium/options/2'),
                        \Yii::t('strings', 'help/kits/medium/options/3'),
                    ][rand (0, 2)],
                    'cost' => Yii::$app->i18n->getCurrencySetting('donationOption3'),
                ]) ?>
                <?= PreparedPackage::widget([
                    'title' => Yii::t('strings', 'help/kits/maximum/title'),
                    'desc' => [
                        \Yii::t('strings', 'help/kits/maximum/options/1'),
                        \Yii::t('strings', 'help/kits/maximum/options/2'),
                        \Yii::t('strings', 'help/kits/maximum/options/3'),
                    ][rand (0, 2)],
                    'cost' => Yii::$app->i18n->getCurrencySetting('donationOption4'),
                ]) ?>
            </div>

            <div class="row row--separate">
                <div class="row_block-6">

                    <?= Yii::t('texts/help', 'help/pharmacy/part2') ?>

                </div>
            </div>

            <?= Yii::t('texts/help', 'help/package/sections/promotional-products') ?>
            <?= Yii::t('texts/help', 'help/package/sections/household-products') ?>
            <?= Yii::t('texts/help', 'help/package/sections/linen') ?>
            <?= Yii::t('texts/help', 'help/package/sections/clothing-and-footwear') ?>
            <?= Yii::t('texts/help', 'help/package/sections/hygienic-products') ?>
            <?= Yii::t('texts/help', 'help/package/sections/musical-instruments') ?>
            <?= Yii::t('texts/help', 'help/package/sections/childcare-products') ?>
            <?= Yii::t('texts/help', 'help/package/sections/groceries') ?>
            <?= Yii::t('texts/help', 'help/package/sections/books') ?>
            <?= Yii::t('texts/help', 'help/package/sections/other') ?>
    </div>
</div>
