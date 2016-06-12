<?php
namespace app\components;

use yii\i18n\MessageSource;
use app\models\TranslationText;

class MysqlTextsMessageSource extends MessageSource
{
    public $rootScope;

    protected function loadMessages($category, $language)
    {
        $parser = new \cebe\markdown\Markdown();


        $query = TranslationText::find()
            ->where([
                'lang' => $language
            ]);

        $rootScopePrefix = $this->rootScope . '/';
        if (substr($category, 0, strlen($rootScopePrefix)) == $rootScopePrefix) {
            $category = substr($category, strlen($rootScopePrefix));
            $query->andWhere('scope like :scope', ['scope' => "$category%"]);
        }

        $allTranslations = $query->all();
        $translations = [];

        foreach($allTranslations as $translation) {
            $translations[$translation['name']] = $parser->parse($translation['value']); //todo: strip HTML codes?
        }

        return $translations;

    }
}
