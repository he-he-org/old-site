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
    public static function tableName()
    {
        return 'news_news_tags';
    }

    public function rules()
    {
        return [
            [["id", "news_id", "news_tags_id"], "safe"]
        ];
    }

    public function extraFields()
    {
        return ['newsItem', 'tag'];
    }

    public function getNewsItem()
    {
        return $this->hasOne(NewsItem::className(), ['id' => 'news_id']);
    }

    public function getTag()
    {
        return $this->hasOne(NewsTag::className(), ['id' => 'news_tags_id']);
    }
}
