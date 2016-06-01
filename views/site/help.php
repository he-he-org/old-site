<?php


use app\assets\HelpAsset;

use app\widgets\help\CategoryMenu;
use app\widgets\help\PreparedPackage;
use app\helpers\RouteHelper;

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
            ['title' => 'Медикаменты', 'url' => 'help/pharmacy'],
            ['title' => 'Печатные материалы', 'url' => 'help/press'],
            ['title' => 'Посуда, хозяйство', 'url' => 'help/tableware'],
            ['title' => 'Белье, текстиль', 'url' => 'help/linen'],
            ['title' => 'Одежда, обувь', 'url' => 'help/clothes'],
            ['title' => 'Кожа, гигиена', 'url' => 'help/hygiene'],
            ['title' => 'Техника', 'url' => 'help/tech'],
            ['title' => 'Музыка', 'url' => 'help/music'],
            ['title' => 'Детям', 'url' => 'help/children'],
            ['title' => 'Еда, напитки', 'url' => 'help/food'],
            ['title' => 'Книги', 'url' => 'help/books'],
            ['title' => 'Разное', 'url' => 'help/misc'],
        ]]) ?>
    </div>
    <div class="row_block-9">
        <?php $section = RouteHelper::getSection(Yii::$app->request->pathinfo, 'pharmacy') ?>

        <?php if ($section === 'pharmacy') { ?>

            <h1>Готовые наборы</h1>
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
                <div class="row_block-6">
                    <h2>Если хотите самостоятельно купить препараты и отправить в Гватемалу</h2>
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
                    <h2>Полный список необходимых медикаментв</h2>
                    <h4>Перевязка и расходные материалы</h4>
                    <div class="check-item"><span>Бинт стерильный 1.6 м x 1 м</span><span>30 &#8381;</span></div>
                    <div class="check-item"><span>Бинт стерильный 1.5 м x 1 м</span><span>12 &#8381;</span></div>
                    <div class="check-item"><span>Салфетки кровоостанавливающие в упаковках по 7 штук</span><span>90 &#8381;</span></div>

                    <h4>Медицинский препараты</h4>
                    <div class="check-item"><span>Анальгин в таблетках</span><span>40 &#8381;</span></div>
                    <div class="check-item"><span>Анальгин в ампулах</span><span>100 &#8381;</span></div>
                    <div class="check-item"><span>Парацетамол</span><span>40 &#8381;</span></div>
                    <div class="check-item"><span>Фуразолидон</span><span>120 &#8381;</span></div>
                </div>
            </div>
        <?php } else if ($section === 'press') { ?>
            <h1>Печатные материалы</h1>
            <div class="check-item">футболки с нашим лого</div>
            <div class="check-item">хирургические рубашки с нашим лого</div>
            <div class="check-item">халаты с нашим лого</div>
            <div class="check-item">отдельно лого (нашивки)</div>
            <div class="check-item">наклейки с нашим лого</div>
        <?php } else if ($section === 'tableware') { ?>
            <h1>Посуда, хозяйство</h1>
            <div class="check-item">посуда из твердого пластика/алюминия</div>
            <div class="check-item">пластиковые контейнеры</div>
            <div class="check-item">коробки из пластика/твердого картона (аля икея)</div>
            <div class="check-item">умывальник</div>
            <div class="check-item">вешалки</div>
            <div class="check-item">прищепки</div>
            <div class="check-item">надувные кровати-матрацы (лучше полуторные)</div>
        <?php } else if ($section === 'linen') { ?>
            <h1>Белье, текстиль</h1>
            <div class="check-item">постельное белье на 2-х спальные/ односпальные кровати</div>
            <div class="check-item">тряпичные мешки</div>
            <div class="check-item">полотенца</div>
            <div class="check-item">прихватки</div>
            <div class="check-item">скатерти</div>
            <div class="check-item">половички</div>
            <div class="check-item">веревки/канат/бельевая/трос</div>
        <?php } else if ($section === 'clothes') { ?>
            <h1>Одежда, обувь</h1>
            <div class="check-item">резиновые сапоги</div>
            <div class="check-item">рюкзаки разных размеров</div>
            <div class="check-item">носки</div>
            <div class="check-item">перчатки рабочие</div>
        <?php } else if ($section === 'hygiene') { ?>
            <h1>Кожа, гигиена</h1>
            <div class="check-item">солнцезащитный крем</div>
            <div class="check-item">крем от комаров</div>
            <div class="check-item">мыло</div>
        <?php } else if ($section === 'tech') { ?>
            <h1>Техника</h1>
            <div class="check-item">проектор</div>
            <div class="check-item">фотокамера</div>
            <div class="check-item">видеокамера</div>
            <div class="check-item">принтер</div>
        <?php } else if ($section === 'music') { ?>
            <h1>Музыка</h1>
            <div class="check-item">губная гармошка</div>
            <div class="check-item">гармошка</div>
            <div class="check-item">флейта</div>
            <div class="check-item">гавайская гитара</div>
            <div class="check-item">балалайка</div>
            <div class="check-item">ксилофон</div>
            <div class="check-item">бубен</div>
            <div class="check-item">тамбурин</div>
        <?php } else if ($section === 'children') { ?>
            <h1>Детям</h1>
            <div class="check-item">учебники английского/русского языков</div>
            <div class="check-item">детские книжки с картинками</div>
            <div class="check-item">расскраски</div>
            <div class="check-item">цветные карандаши</div>
            <div class="check-item">мелки</div>
            <div class="check-item">пластилин</div>
            <div class="check-item">краски</div>
            <div class="check-item">фломастеры</div>
            <div class="check-item">настольные игры</div>
            <div class="check-item">детские игрушки-погремушки</div>
        <?php } else if ($section === 'food') { ?>
            <h1>Еда, напитки</h1>
            <div class="check-item">сухое молоко</div>
            <div class="check-item">шоколад</div>
            <div class="check-item">гематоген</div>
            <div class="check-item">мука цельнозерновая</div>
            <div class="check-item">дрожжи</div>
            <div class="check-item">ванилин</div>
            <div class="check-item">сода</div>
            <div class="check-item">манка</div>
            <div class="check-item">гречка</div>
            <div class="check-item">пшенка</div>
            <div class="check-item">макароны</div>
            <div class="check-item">сгущенка</div>
            <div class="check-item">кубики бульонные</div>
            <div class="check-item">сгущенка</div>
            <div class="check-item">тущенка</div>
            <div class="check-item">рыбные консервы</div>
            <div class="check-item">козинаки</div>
            <div class="check-item">халва</div>
            <div class="check-item">печенье/пряники</div>
            <div class="check-item">изюм/курага/чернослив</div>
            <div class="check-item">орехи</div>
            <div class="check-item">мед</div>
            <div class="check-item">чай</div>
            <div class="check-item">кисель</div>
            <div class="check-item">пудинги в пакетах</div>
        <?php } else if ($section === 'books') { ?>
            <h1>Книги</h1>
            <div class="check-item">книги по медицине на испанском/английском языках</div>
            <div class="check-item">атласы медицинские</div>
            <div class="check-item">муляжи медицинские</div>
            <div class="check-item">манекены</div>
            <div class="check-item">детское питание</div>
            <div class="check-item">детские смеси</div>
            <div class="check-item">перчатки медицинские</div>
            <div class="check-item">тест-полоски для анализа мочи</div>
            <div class="check-item">катетеры урологические CH16/18</div>
            <div class="check-item">ортопедические шины (запястье, рука и другие)</div>
            <div class="check-item">тесты на беременность</div>
            <div class="check-item">тест-полоски для глюкометров (аку)</div>
            <div class="check-item">компрессионные чулки</div>
        <?php } else if ($section === 'misc') { ?>
            <h1>Разное</h1>
            <div class="check-item">кисточки малярные</div>
            <div class="check-item">мотивы русской культуры (матрешки/орнаменты/баба на чайник/утварь)</div>
            <div class="check-item">семена газонной травы</div>
        <?php } ?>


    </div>

</div>
