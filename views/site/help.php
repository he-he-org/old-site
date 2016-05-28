<?php


use app\assets\HelpAsset;

use app\widgets\help\CategoryMenu;
use app\widgets\help\PreparedPackage;

//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Help';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Помочь проекту';
}

$this->title = 'Health & Help - ' . $pageName;

HelpAsset::register($this);
?>


<div class="row">
    <div class="row_block-12 help-options">
        <div class="help-options_option help-options_option--active">
            <div class="help-options_icon"><img src="/images/help/shipping.svg"/></div>
            <div class="help-options_title">Отправить посылку</div>
        </div>
        <div class="help-options_option">
            <div class="help-options_icon"><img src="/images/help/card.svg"/></div>
            <div class="help-options_title">Сделать пожертвование</div>
        </div>
        <div class="help-options_option">
            <div class="help-options_icon"><img src="/images/help/user.svg"/></div>
            <div class="help-options_title">Стать волонтером</div>
        </div>
    </div>
</div>

<div class="row menu-and-content">
    <div class="row_block-3">
        <!-- todo: make a proper translation -->
        <?= CategoryMenu::widget(['items' => [
            ['title' => 'Медикаменты', 'url' => ['help/pharmacy']],
            ['title' => 'Печатные материалы', 'url' => ['help/press']],
            ['title' => 'Посуда, хозяйство', 'url' => ['help/tableware']],
            ['title' => 'Белье, текстиль', 'url' => ['help/linen']],
            ['title' => 'Одежда, обувь', 'url' => ['help/clothes']],
            ['title' => 'Кожа, гигиена', 'url' => ['help/hygiene']],
            ['title' => 'Техника', 'url' => ['help/tech']],
            ['title' => 'Музыка', 'url' => ['help/music']],
            ['title' => 'Детям', 'url' => ['help/children']],
            ['title' => 'Еда, напитки', 'url' => ['help/food']],
            ['title' => 'Книги', 'url' => ['help/books']],
            ['title' => 'Разное', 'url' => ['help/misc']],
        ]]) ?>
    </div>
    <div class="row_block-9">
        <h3>Готовые наборы</h3>
        <p>Включают в себя самое необходимое на текущий момент</p>
        <p>Пожертвование пойдет на закупку и отправку препаратов</p>
        <div class="packages">
            <?= PreparedPackage::widget([
                'title' => 'Минимальный',
                'desc' => 'Бинты, пластыри, парацетамол, анальгин',
                'cost' => '500',
            ]) ?>
            <?= PreparedPackage::widget([
                'title' => 'Максимальный',
                'desc' => 'Бинты, пластыри, парацетамол, анальгин, фуразолидон, парацетамол,
                    азитромицин, линкомицин, тавегил, дексаметазон, драмина, кетанов, нимика, но-шпа',
                'cost' => '2000',
            ]) ?>
            <?= PreparedPackage::widget([
                'title' => 'Средний',
                'desc' => 'Тавигил, немазол, но-шпа, дексаметазон',
                'cost' => '1000',
            ]) ?>
        </div>

        <div class="row content-block">
            <div class="row_block-7">
                <h3>Если хотите самостоятельно купить препараты и отправить в Гватемалу</h3>
                <p>Есть несколько вариантов отправлений</p>
                <ol>
                    <li><a href="#">Готовые наборы с AliExpress</a>;</li>
                    <li><a href="#">Почтой РФ</a>;</li>
                    <li><a href="#">Почтой СНГ</a>;</li>
                    <li><a href="#">Курьерские службы</a>.</li>
                </ol>

            </div>
        </div>

        <div class="row content-block">
            <div class="row_block-6">
                <h3>Полный список необходимых медикаментв</h3>
                <h4>Перевязка и расходные материалы</h4>
                <div class="check-item"><label><input type="checkbox">Бинт стерильный 1.6 м x 1 м</label><span>30 ₽</span></div>
                <div class="check-item"><label><input type="checkbox">Бинт стерильный 1.5 м x 1 м</label><span>12 ₽</span></div>
                <div class="check-item"><label><input type="checkbox">Салфетки кровоостанавливающие в упаковках по 7 штук</label><span>90 ₽</span></div>

                <h4>Медицинский препараты</h4>
                <div class="check-item"><label><input type="checkbox">Анальгин в таблетках</label><span>40 ₽</span></div>
                <div class="check-item"><label><input type="checkbox">Анальгин в ампулах</label><span>100 ₽</span></div>
                <div class="check-item"><label><input type="checkbox">Парацетамол</label><span>40 ₽</span></div>
                <div class="check-item"><label><input type="checkbox">Фуразолидон</label><span>120 ₽</span></div>
            </div>
            <div class="row_block-3 column">
                <button class="send-button">Отправить 80 Р</button>
            </div>
        </div>


    </div>

</div>
