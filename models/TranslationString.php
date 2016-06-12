<?php
namespace app\models;

use yii\db\ActiveRecord;

class TranslationString extends ActiveRecord
{
    public static function tableName()
    {
        return 'i18n_strings';
    }
}
