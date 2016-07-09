<?php

use app\migrations\ExtMigration;
use yii\db\Migration;

class m160702_103120_add_some_news extends ExtMigration
{
    public function safeUp()
    {
        // Insert tags
        $this->insert('news_tags', ['title_id' => $this->makeString('строительство', 'building')]);
        $buildingTagId = $this->getDb()->getLastInsertID();

        $this->insert('news_tags', ['title_id' => $this->makeString('финансы', 'finance')]);
        $financesTagId = $this->getDb()->getLastInsertID();

        $this->insert('news_tags', ['title_id' => $this->makeString('спонсоры')]);
        $this->insert('news_tags', ['title_id' => $this->makeString('медикаменты')]);


        // Insert news
        $this->insert('news', [
            'title_id' => $this->makeString('Расскажите о нас'),
            'text_id' => $this->makeText('Информация решает самые сложные вопросы, ведь «кто владеет информацией, владеет миром». В ваших силах овладеть миром. Подумайте сами: ведь это же прекрасно, когда мир держат в руках люди, которые стремятся помочь другим! '),
            'image_url' => '/images/news_item_1.png',
        ]);
        $firstItemId = $this->getDb()->getLastInsertID();
        $this->insert('news', [
            'title_id' => $this->makeString('The standard Lorem Ipsum passage'),
            'text_id' => $this->makeText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
            'image_url' => '/images/news_item_1.png',
        ]);
        $secondItemId = $this->getDb()->getLastInsertID();

        // Make connection
        $this->insert('news_news_tags', [ 'news_id' => $firstItemId, 'news_tags_id' => $buildingTagId,]);
        $this->insert('news_news_tags', [ 'news_id' => $firstItemId, 'news_tags_id' => $financesTagId,]);
        $this->insert('news_news_tags', [ 'news_id' => $secondItemId, 'news_tags_id' => $financesTagId,]);

    }

    public function down()
    {
        echo "m160702_103120_add_some_news cannot be reverted.\n";

        return false;
    }
}
