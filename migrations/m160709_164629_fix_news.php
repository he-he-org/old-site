<?php

use app\migrations\ExtMigration;
use yii\db\Migration;

class m160709_164629_fix_news extends ExtMigration
{
    public function safeUp()
    {
        $item = $this->findNewsItem('Первые новости о ходе кампании');
        $this->update("news", 
            ['image_url' => '/images/news/2016-06-29_12-17-58-18636.png'], 
            ['id' => $item['id']]
        );
    }
    public function down()
    {
        echo "m160709_164629_fix_news cannot be reverted.\n";

        return false;
    }

    /*
    // Use safeUp/safeDown to run migration code within a transaction
    public function safeUp()
    {
    }

    public function safeDown()
    {
    }
    */
}
