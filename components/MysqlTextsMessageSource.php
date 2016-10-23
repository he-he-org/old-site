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

        $query = TranslationText::find()->select(['name', 'format', $language]);

        $rootScopePrefix = $this->rootScope . '/';
        if (substr($category, 0, strlen($rootScopePrefix)) == $rootScopePrefix) {
            $category = substr($category, strlen($rootScopePrefix));
            $query->andWhere('scope like :scope', ['scope' => "$category%"]);
        }

        $allTranslations = $query->asArray()->all();
        $translations = [];

        foreach($allTranslations as $translation) {
            $translatedRawText = $translation[$language];
            if ($translation['format'] === 'markdown') {
                $translatedText = $parser->parse($translatedRawText);  //todo: strip HTML codes?
            }
            else {
                $translatedText = $translatedRawText;
            }
            $translations[$translation['name']] = $translatedText;
        }

        return $translations;

    }
}
