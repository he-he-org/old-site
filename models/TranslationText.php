<?php
namespace app\models;

use yii\db\ActiveRecord;

class TranslationText extends ActiveRecord
{
    public static function tableName()
    {
        return 'i18n_texts';
    }

    public static function translate($name, $lang) {
        $translation = TranslationString::find()
            ->where([
                'name' => $name,
                'lang' => $lang
            ])
            ->one();

        if ($translation) {
            return $translation['value'];
        }
        else {
            return $name;
        }
    }
}
