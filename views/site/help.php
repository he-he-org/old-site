<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;

use app\assets\HelpAsset;

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
            <div class="help-options_icon"><img src="/images/card.png"/></div>
            <div class="help-options_title">Отправить посылку</div>
        </div>
        <div class="help-options_option">
            <div class="help-options_icon"><img src="/images/card.png"/></div>
            <div class="help-options_title">Сделать пожертвование</div>
        </div>
        <div class="help-options_option">
            <div class="help-options_icon"><img src="/images/card.png"/></div>
            <div class="help-options_title">Стать волонтером</div>
        </div>
    </div>
</div>

<div class="row menu-and-content">
    <div class="row_block-3">
        <div class="category-menu">
            <div class="category-menu_item category-menu_item--active">Медикаменты</div>
            <div class="category-menu_item">Печатные материалы</div>
            <div class="category-menu_item">Посуда, хозяйство</div>
            <div class="category-menu_item">Белье, текстиль</div>
            <div class="category-menu_item">Одежда, обувь</div>
            <div class="category-menu_item">Кожа, гигиена</div>
        </div>
    </div>
    <div class="row_block-9">
        <h3>Готовые наборы</h3>
        <div>Включают в себя самое необходимое на текущий момент</div>
        <div>Пожертвование пойдет на закупку и отправку препаратов</div>
        <div class="packages">
            <div class="packages_item package">
                <div class="package_title">Минимальный</div>
                <div class="package_desc">Бинты, пластыри, парацетамол, анальгин</div>
                <div class="package_button"><button>Отправить 500 Р</button></div>
            </div>
            <div class="packages_item package">
                <div class="package_title">Максимальный</div>
                <div class="package_desc">Бинты, пластыри, парацетамол, анальгин, фуразолидон, парацетамол,
                    азитромицин, линкомицин, тавегил, дексаметазон, драмина, кетанов, нимика, но-шпа</div>
                <div class="package_button"><button>Отправить 2000 Р</button></div>
            </div>
            <div class="packages_item package">
                <div class="package_title">Средний</div>
                <div class="package_desc">Тавигил, немазол, но-шпа, дексаметазон</div>
                <div class="package_button"><button>Отправить 1000 Р</button></div>
            </div>
        </div>

        <h3>Если хотите самостоятельно купить препараты и отправить в Гватемалу</h3>
        <div>Есть несколько вариантов отправлений</div>
        <ol>
            <li>Готовые наборы с AliExpress;</li>
            <li>Почтой РФ;</li>
            <li>Почтой СНГ;</li>
            <li>Курьерские службы.</li>
        </ol>

        <h3>Полный список необходимых медикаментв</h3>
        <button>Отправить 80 Р</button>
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

</div>