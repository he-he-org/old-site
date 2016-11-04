
<?php
use yii\helpers\Url;

$page = Yii::$app->request->getPage();
$section = Yii::$app->request->getSection();
$subsection = Yii::$app->request->getSectionPart(1, null);
$lang = Yii::$app->request->getLang();
?>

<div class="row">
    <?php if ($subsection === null) { ?>
        <div class="row_block-8">
            <h1><?= \Yii::t('strings', 'volunteers/vacancies/title'); ?></h1>
            <?php foreach($vacancies as $vacancy) { ?>
                <p><a href="<?= Url::toRoute([
                        $page,
                        'section' => $section,
                        'subsection' => $vacancy['id'],
                        'lang' => $lang]) ?>"><?= $vacancy['title'] ?></a></p>
            <?php } ?>
        </div>
    <?php } else { ?>
        <div class="row_block-8">
            <h1><?= $vacancy['title'] ?></h1>
            <div>
                <?= $vacancy['body'] ?>
                <?= \Yii::t('texts', 'volunteers/vacancies/common-bottom'); ?>
            </div>
        </div>
    <?php } ?>
</div>
