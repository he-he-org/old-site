<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\db\ActiveRecord;

/**
 * ContactForm is the model behind the contact form.
 */
class NewsNewsTag extends ActiveRecord
{
    public function rules()
    {
        return [
            [["id", "news_id", "news_tags_id"], "safe"]
        ];
    }

    public static function tableName()
    {
        return 'news_news_tags';
    }

}
