<?php

use app\widgets\main\TeamMemberWidget;
use app\widgets\main\SpecialProject;
use app\widgets\shared\MainDonateForm;
use app\assets\MainAsset;
use yii\helpers\Url;

//
// TODO: update localization algorythm
// NOTE! See https://github.com/samdark/yii2-cookbook/blob/master/book/i18n-selecting-application-language.md
//
$pageName = 'Main';
if (Yii::$app->language == 'ru-RU') {
    $pageName = 'Главная';
}

$this->title = 'Health & Help - ' . $pageName;

MainAsset::register($this);

?>
<div class="row intro-row">
    <div class="row_block-6 intro">
        <h1>Благотворительный проект</h1>
        <p>
            В проекте Health&Help почти сотня людей объединилась для того, чтобы дать гватемальским индейцам
            Майя доступ к базовой медицинской помощи. Работаем, чтобы помогать людям, а для покупки
            лекарств, расходных материалов и оборудования нам нужна ваша помощь. Даже сто рублей могут
            помочь вылечить человека
        </p>
    </div>
    <div class="row_block-5">
        <?= MainDonateForm::widget() ?>
    </div>
</div>
<div class="row  all-members-link-row">
    <a href="<?= Url::toRoute(['team']) ?>">Вся команда</a>
</div>
<div class="row team-row">
    <?php foreach ($members as $member ) {?>
        <?= TeamMemberWidget::widget($member) ?>
    <?php } ?>
</div>
<div class="row special-projects-title-row">Наши спецпроекты</div>

<?php foreach ($specialProjects as $specialProject) { ?>
    <div class="row">
        <?= SpecialProject::widget($specialProject) ?>
    </div>
<?php } ?>
