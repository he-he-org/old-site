<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\db\ActiveRecord;

/**
 * ContactForm is the model behind the contact form.
 */
class NewsItem extends ActiveRecord
{
    public function rules()
    {
        return [
            [["id", "date", "title_id", "text_id", "image_url", "published"], "safe"]
        ];
    }

    public function extraFields()
    {
        return ['title', 'text', 'tags'];
    }

    public static function tableName()
    {
        return 'news';
    }

    public function getTitle()
    {
        return $this->hasOne(TranslationString::className(), ['id' => 'title_id']);
    }

    public function getText()
    {
        return $this->hasOne(TranslationText::className(), ['id' => 'text_id']);
    }

    public function getTags()
    {
        return $this
            ->hasMany(NewsTag::className(), ['id' => 'news_tags_id'])
            ->viaTable('news_news_tags', ['news_id' => 'id']);
    }
}
