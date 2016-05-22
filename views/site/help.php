<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;


//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Help';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Помочь проекту';
}

$this->title = 'Health & Help - ' . $pageName;

?>


<div class="row">
    <div class="row_block-3">
        <div>
            <div>Медикаменты</div>
            <div>Печатные материалы</div>
            <div>Посуда, хозяйство</div>
            <div>Белье, текстиль</div>
            <div>Одежда, обувь</div>
            <div>Кожа, гигиена</div>
        </div>
    </div>
    <div class="row_block-9">
        <h1>Готовые наборы</h1>
        <div>Включают в себя самое необходимое на текущий момент</div>
        <div>Пожертвование пойдет на закупку и отправку препаратов</div>
        <div>
            <div>
                <div>Минимальный</div>
                <div>Бинты, пластыри, парацетамол, анальгин</div>
                <div><button>Отправить 500 Р</button></div>
            </div>
            <div>
                <div>Максимальный</div>
                <div>2 пакета травы, 75 таблеток мескалина, 5 упаковок кислоты, полсолонки кокаина и целое множество транквилизаторов всех сортов и расцветок, депресанты, а также текила, ром, ящик пива, пинта чистого эфира и 2 дюжины ампул амилнитрита</div>
                <div><button>Отправить 2000 Р</button></div>
            </div>
            <div>
                <div>Средний</div>
                <div>Тавигил, немазол, но-шпа, дексаметазон</div>
                <div><button>Отправить 1000 Р</button></div>
            </div>
        </div>

        <h1>Если хотите самостоятельно купить препараты и отправить в Гватемалу</h1>
        <div>Есть несколько вариантов отправлений</div>
        <ol>
            <li>Готовые наборы с AliExpress;</li>
            <li>Почтой РФ;</li>
            <li>Почтой СНГ;</li>
            <li>Курьерские службы/</li>
        </ol>

        <h1>Полный список необходимых медикаментв</h1>
        <button>Отправить 80 Р</button>
        <h2>Перевязка и расходные материалы</h2>
        <label><input type="checkbox">Бинт стерильный 1.6 м x 1 м 30Р</label>
        <label><input type="checkbox">Бинт стерильный 1.5 м x 1 м 12Р</label>
        <label><input type="checkbox">Салфетки кровоостанавливающие в упаковках по 7 штук 90 Р</label>

        <h2>Медицинский препараты</h2>
        <label><input type="checkbox">Анальгин в таблетках 40 Р</label>
        <label><input type="checkbox">Анальгин в ампулах 100 Р</label>
        <label><input type="checkbox">Парацетамол 40 Р</label>
        <label><input type="checkbox">Фуразолидон 120 Р</label>
    </div>

</div>