<?php
namespace app\components;

use yii\i18n\MessageSource;
use app\models\TranslationString;

class MysqlMessageSource extends MessageSource
{
    protected function loadMessages($category, $language)
    {
        $allTranslations = TranslationString::find()
            ->select(['name', $language])
            ->all();
        $translations = [];

        foreach($allTranslations as $translation) {
            $translations[$translation['name']] = $translation[$language];
        }

        return $translations;

    }
}
