<?php
namespace app\models;

use yii\db\ActiveRecord;

class TranslationText extends ActiveRecord
{
    public function rules()
    {
        return [
            [['id', 'name', 'en-US', 'es-ES', 'ru-RU', 'scope'], 'safe']
        ];
    }

    public static function tableName()
    {
        return 'i18n_texts';
    }
}
