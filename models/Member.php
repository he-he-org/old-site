<?php
namespace app\models;

use yii\db\ActiveRecord;

class Member extends ActiveRecord
{
    public function rules()
    {
        return [
            [["id", "name_id", "role_id", "photo_url", "vk", "fb", "linked_in", "email"], "safe"]
        ];
    }

    public function extraFields()
    {
        return ['name', 'role'];
    }

    public static function tableName()
    {
        return 'members';
    }

    public function getName()
    {
        return $this->hasOne(TranslationString::className(), ['id' => 'name_id']);
    }


    public function getRole()
    {
        return $this->hasOne(TranslationString::className(), ['id' => 'role_id']);
    }

}
