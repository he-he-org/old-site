<?php
namespace app\models;

use yii\db\ActiveRecord;

class Member extends ActiveRecord
{
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
