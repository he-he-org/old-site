<?php
namespace app\models;

use yii\db\ActiveRecord;

class VolunteersQuestionnaireResponse extends ActiveRecord
{
    public function rules()
    {
        return [
            [["id", "body"], "safe"]
        ];
    }

    public static function tableName()
    {
        return 'volunteers_questionnaire_responses';
    }
}
