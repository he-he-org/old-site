<?php
/**
 * Created by IntelliJ IDEA.
 * User: koluch
 * Date: 02/07/16
 * Time: 16:13
 */

namespace app\models;


use yii\db\ActiveRecord;

class NewsTag extends ActiveRecord
{
    public static function tableName()
    {
        return 'news_tags';
    }

    public function getTitle()
    {
        return $this->hasOne(TranslationString::className(), ['id' => 'title_id']);
    }

    public function getNews()
    {
        return $this
            ->hasMany(News::className(), ['id' => 'news_id'])
            ->viaTable('news_news_tags', ['news_tags_id' => 'id']);
    }
}
