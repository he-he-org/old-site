<?php

use yii\db\Migration;

class m160721_204739_alter_junction_table extends Migration
{
    public function up()
    {
        $this->dropPrimaryKey("news_news_tags", "news_news_tags");
        $this->addColumn("news_news_tags", "id", $this->primaryKey());
        $this->createIndex(
            'idx-news_news_tags-unique',
            'news_news_tags',
            ['news_id', 'news_tags_id'],
            true
        );

    }

    public function down()
    {
        $this->dropIndex("idx-news_news_tags-unique", "news_news_tags");
        $this->dropColumn("news_news_tags", "id");
        $this->addPrimaryKey("news_news_tags", "news_news_tags", ['news_id', 'news_tags_id']);
    }

}
