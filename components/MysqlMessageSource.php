<?php
namespace app\components;

use yii\i18n\MessageSource;
use app\models\TranslationString;

class MysqlMessageSource extends MessageSource
{
    protected function loadMessages($category, $language)
    {
        $allTranslations = TranslationString::find()
            ->where([
                'lang' => $language
            ])
            ->all();
        $translations = [];

        foreach($allTranslations as $translation) {
            $translations[$translation['name']] = $translation['value'];
        }

        return $translations;

    }
}
