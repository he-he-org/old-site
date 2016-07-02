<?php

use yii\db\Migration;

/**
 * Handles the creation for table `news_tags`.
 */
class m160702_100405_create_news_tags extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('news_tags', [
            'id' => $this->primaryKey(),
            'title_id' => $this->integer()->notNull(),
        ]);

        $this->addForeignKey(
            'fk-news-tags-title_id',
            'news_tags',
            'title_id',
            'i18n_strings',
            'id'
        );

        $this->createTable('news_tags_link', [
            'id' => $this->primaryKey(),
            'news_id' => $this->integer()->notNull(),
            'tag_id' => $this->integer()->notNull(),
        ]);


    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('news_tags');
    }
}
