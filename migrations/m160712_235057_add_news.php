<?php

use app\migrations\ExtMigration;
use yii\db\Migration;

class m160712_235057_add_news extends ExtMigration
{
    public function safeUp()
    {
        // Insert tags
        // "О", "", "", "Лариса Мельникова"
        $tags = [];
        foreach(['Москва', 'FuckUp Night', 'Digital October', 'Лариса Мельникова'] as $newTag) {
            $this->insert('news_tags', ['title_id' => $this->makeString($newTag)]);
            array_push($tags, $this->getDb()->getLastInsertID());
        }
        array_push($tags, $this->findTag("офтальмологическая программа")['id']);
        array_push($tags, $this->findTag("краудфандинг 2")['id']);
        array_push($tags, $this->findTag("мобильные бригады")['id']);


        // Insert news
        $this->insert('news', [
            'date' => '2016-07-10',
            'title_id' => $this->makeString('14 июля расскажем о проекте на FuckUp Night Moscow'),
            'text_id' => $this->makeText(
                '[FuckUp Nights](www.fuckupnights.com) - это серия мероприятий, которая проходит по всему миру и помогает бизнесу и некоммерческим организациям учиться на ошибках друг друга. На нашем пути мы сталкивались со многим - коррупцией, вооруженными стычками, противоречивым законодательством. Иногда мы запоздало или неправильно реагировали на происходящее, и работа над ошибками помогла нам стать сильнее и лучше. 

14 июля в Digital October на второй конференции FuckUp Nights в Москве участник нашей команды [Лариса Мельникова](https://www.facebook.com/LaraMelnikova>) расскажет о том, как наши ошибки повлияли на строительство клиники и наши спецпроекты - офтальмологическую программу и мобильные бригады. 

Узнать больше о конференции можно на [странице мероприятия в Facebook](https://www.facebook.com/events/826560987475408)'),
            'image_url' => '/images/news/img_01-85935.jpg',
        ]);
        $firstItemId = $this->getDb()->getLastInsertID();

        // Make connection
        foreach($tags as $tag) {
            $this->insert('news_news_tags', [ 'news_id' => $firstItemId, 'news_tags_id' => $tag]);
        }
    }

    public function down()
    {
        echo "m160712_235057_add_news cannot be reverted.\n";

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
