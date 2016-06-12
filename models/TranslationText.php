<?php
namespace app\models;

use yii\db\ActiveRecord;

class TranslationText extends ActiveRecord
{
    public static function tableName()
    {
        return 'i18n_texts';
    }

}
