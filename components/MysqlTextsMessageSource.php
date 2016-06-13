<?php
namespace app\components;

use yii\i18n\MessageSource;
use app\models\TranslationText;

class MysqlTextsMessageSource extends MessageSource
{
    public $rootScope;

    protected function loadMessages($category, $language)
    {
        $parser = new ExtMarkdown();


        $query = TranslationText::find()
            ->select(['name', $language]);

        $rootScopePrefix = $this->rootScope . '/';
        if (substr($category, 0, strlen($rootScopePrefix)) == $rootScopePrefix) {
            $category = substr($category, strlen($rootScopePrefix));
            $query->andWhere('scope like :scope', ['scope' => "$category%"]);
        }

        $allTranslations = $query->asArray()->all();
        $translations = [];

        foreach($allTranslations as $translation) {
            $translations[$translation['name']] = $parser->parse($translation[$language]); //todo: strip HTML codes?
        }

        return $translations;

    }
}
