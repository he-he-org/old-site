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

<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css'>

<div class="container">
    <div class="fields">
        <header class="header">
            <img src="/logo.png"/>
            <div class="social-networks">
                <div class="social-networks__header">Мы в социальных сетях</div>
            </div>
        </header>
    </div>
    <div class="main-menu row main-center">
        <div class="fields row">
            <div class="navigation-menu row_block-8">
                <div class="navigation-menu_item">О нас</div>
                <div class="navigation-menu_item">Помочь проекту</div>
                <div class="navigation-menu_item">Стать волонтером</div>
                <div class="navigation-menu_item">Новости</div>
                <div class="navigation-menu_item">Контакты</div>
            </div>
            <div class="language-switch row_block-3">
                <div class="language-switch_item">Русский</div>
                <div class="language-switch_item">English</div>
                <div class="language-switch_item">Español</div>
            </div>
        </div>
    </div>
    <div class="fields">
        <div class="body">
            <div class="row intro-row">
                <div class="row_block-9 intro">
                    <h1>Благотворительный проект</h1>
                    <p>
                        В проекте Health&Help почти сотня людей объединилась для того, чтобы дать гватемальским индейцам
                        Майя доступ к базовой медицинской помощи. Работаем, чтобы помогать людям, а для покупки
                        лекарств, расходных материалов и оборудования нам нужна ваша помощь. Даже сто рублей могут
                        помочь вылечить человека
                    </p>
                </div>
                <div class="row_block-3 column main-center">
                    <div class="collected">
                        <div class="collected_header">На проект уже собрано</div>
                        <div class="collected_amount">1 245 548 ₽</div>
                        <button class="uk-button uk-button-success">Пожертвовать</button>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="person row_block-2">
                    <img src="/no_photo.png" class="person_photo"/>
                    <div class="person_name">Лариса Мельникова</div>
                    <div class="person_role">Менеджер</div>
                </div>
                <div class="person row_block-2">
                    <img src="/no_photo.png" class="person_photo"/>
                    <div class="person_name">Кристина Башарова</div>
                    <div class="person_role">Менеджер продукта</div>
                </div>
                <div class="person row_block-2">
                    <img src="/no_photo.png" class="person_photo"/>
                    <div class="person_name">Михаил Никифоров</div>
                    <div class="person_role">Менеджер</div>
                </div>
                <div class="person row_block-2">
                    <img src="/no_photo.png" class="person_photo"/>
                    <div class="person_name">Николай Мавренков</div>
                    <div class="person_role">Веб-разработчик</div>
                </div>
                <div class="person row_block-2">
                    <img src="/no_photo.png" class="person_photo"/>
                    <div class="person_name">Анна Дудко</div>
                    <div class="person_role">Менеджер</div>
                </div>
                <div class="person row_block-2">
                    <img src="/no_photo.png" class="person_photo"/>
                    <div class="person_name">Полина Стародубцева</div>
                    <div class="person_role">Главный управляющий проектами</div>
                </div>
            </div>
            <div class="row">
                <button class="row_block-12 uk-button uk-button-success all-team-button">Вся команда</button>
            </div>
            <div class="row">
                <h2>Наши спецпроекты</h2>
            </div>
            <div class="row">
                <div class="special-project">
                    <div class="special-project_top">
                        <div class="special-project_left">
                            <h1>Строительство клиники</h1>
                            <p>В округе нет чистой воды, пригодной для питья, нам необходимо создать
                                водопровод и очистные сооружения</p>
                        </div>
                        <div class="special-project_right">
                            <div class="special-project_news">
                                <div class="special-project_news-header">Новости</div>
                                <ol class="special-project_news-list">
                                    <li class="special-project_news-item">Готов фундамент для здания клиники</li>
                                    <li class="special-project_news-item">Доставлено 350 упаковок лекарств</li>
                                    <li class="special-project_news-item">Вылечено пятеро детей</li>
                                    <li class="special-project_news-item">В спонсоры вошел Сбербанк</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                    <div class="special-project_bottom">
                        <div class="special-project_donate">
                            <input value="1 000 ₽" class="special-project_donate-amount"/>
                            <button class="uk-button uk-button-success">Пожертвовать</button>
                        </div>
                        <div class="special-project_links">
                            <button class="uk-button uk-button-success">Как помочь</button>
                            <button class="uk-button uk-button-success">План развития</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>