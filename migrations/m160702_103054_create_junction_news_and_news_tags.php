<?php

use yii\db\Migration;

/**
 * Handles the creation for table `news_news_tags`.
 * Has foreign keys to the tables:
 *
 * - `news`
 * - `news_tags`
 */
class m160702_103054_create_junction_news_and_news_tags extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('news_news_tags', [
            'news_id' => $this->integer(),
            'news_tags_id' => $this->integer(),
            'PRIMARY KEY(news_id, news_tags_id)',
        ]);

        // creates index for column `news_id`
        $this->createIndex(
            'idx-news_news_tags-news_id',
            'news_news_tags',
            'news_id'
        );

        // add foreign key for table `news`
        $this->addForeignKey(
            'fk-news_news_tags-news_id',
            'news_news_tags',
            'news_id',
            'news',
            'id',
            'CASCADE'
        );

        // creates index for column `news_tags_id`
        $this->createIndex(
            'idx-news_news_tags-news_tags_id',
            'news_news_tags',
            'news_tags_id'
        );

        // add foreign key for table `news_tags`
        $this->addForeignKey(
            'fk-news_news_tags-news_tags_id',
            'news_news_tags',
            'news_tags_id',
            'news_tags',
            'id',
            'CASCADE'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        // drops foreign key for table `news`
        $this->dropForeignKey(
            'fk-news_news_tags-news_id',
            'news_news_tags'
        );

        // drops index for column `news_id`
        $this->dropIndex(
            'idx-news_news_tags-news_id',
            'news_news_tags'
        );

        // drops foreign key for table `news_tags`
        $this->dropForeignKey(
            'fk-news_news_tags-news_tags_id',
            'news_news_tags'
        );

        // drops index for column `news_tags_id`
        $this->dropIndex(
            'idx-news_news_tags-news_tags_id',
            'news_news_tags'
        );

        $this->dropTable('news_news_tags');
    }
}
