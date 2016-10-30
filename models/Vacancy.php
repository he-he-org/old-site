<?php
namespace app\models;

use yii\db\ActiveRecord;

class Vacancy extends ActiveRecord
{
    public function rules()
    {
        return [
            [["id", "title_id", "body_id"], "safe"]
        ];
    }

    public function extraFields()
    {
        return ['title', 'body'];
    }

    public static function tableName()
    {
        return 'vacancies';
    }

    public function getTitle()
    {
        return $this->hasOne(TranslationString::className(), ['id' => 'title_id']);
    }


    public function getBody()
    {
        return $this->hasOne(TranslationText::className(), ['id' => 'body_id']);
    }

}
