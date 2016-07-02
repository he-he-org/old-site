<?php

use yii\db\Migration;

/**
 * Handles the creation for table `news`.
 */
class m160702_095004_create_news extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('news', [
            'id' => $this->primaryKey(),
            'date' => $this->timestamp()->notNull()->defaultExpression("CURRENT_TIMESTAMP"),
            'title_id' => $this->integer()->notNull(),
            'text_id' => $this->integer()->notNull(),
            'image_url' => $this->string(1000),
        ]);

        $this->addForeignKey(
            'fk-news-title_id',
            'news',
            'title_id',
            'i18n_strings',
            'id'
        );

        $this->addForeignKey(
            'fk-news-text_id',
            'news',
            'text_id',
            'i18n_texts',
            'id'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('news');
    }
}
