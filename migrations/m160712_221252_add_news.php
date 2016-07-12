<?php

use app\migrations\ExtMigration;
use yii\db\Migration;

class m160712_221252_add_news extends ExtMigration
{
    public function safeUp()
    {
        // Insert tags
        $this->insert('news_tags', ['title_id' => $this->makeString('офтальмологическая программа')]);
        $tagId = $this->getDb()->getLastInsertID();

        // Insert news
        $this->insert('news', [
            'date' => '2016-07-08',
            'title_id' => $this->makeString('Запускаем офтальмологическую программу'),
            'text_id' => $this->makeText(
                'Гватемала - это страна джунглей, вулканов, индейцев Майя, которые когда-то изобрели шоколад. Но еще это страна, где слабое зрение может убить - если ты плохо видишь, ты не можешь работать, кормить семью или учиться. Потерять зрение там легко, в этом помогают повсевместное недоедание и яркое солнце. 

Мы расспросили друзей и знакомых: в среднем, у каждого третьего человека есть дома очки, которые больше не подходят ему или кому-то из членов его семьи. Или походят, но надоела оправа, вышли из моды, или появилась пара царапин. Эти ненужные очки могут спасти кого-то от голода и дать кому-то шанс на лучшую жизнь. 

Еще никогда стать супергероем-спасателем не было так просто. 

Если ты готов поставить ящик сбора очков в своей компании, пожалуйста, напиши нам на [larisa.v.melnikova@gmail.com](mailto:larisa.v.melnikova@gmail.com)

Если у тебя есть ненужные очки, пожалуйста, [подпишись на нас в Facebook](https://www.facebook.com/healthandhelporg), чтобы получать новости об устанавливаемых ящиках сбора.'),
            'image_url' => '/images/news/img_oft_1-17677.jpg',
        ]);
        $firstItemId = $this->getDb()->getLastInsertID();

        // Make connection
        $this->insert('news_news_tags', [ 'news_id' => $firstItemId, 'news_tags_id' => $tagId,]);


        /********/
        // Remove old unused item
        $item = $this->findNewsItem('Расскажите о нас');
        $this->delete('news', ['id' => $item['id']]);
        $this->delete('i18n_strings', ['id' => $item['title_id']]);
        $this->delete('i18n_texts', ['id' => $item['text_id']]);
        
        
        /******/
        // Fix news item
        $item = $this->findNewsItem('Первые новости о ходе кампании');
        $this->update("i18n_texts",
            ['ru-RU' => 'Уже 50 человек сделали пожертвования на наш проект! Пятидесятым пожертвованием оказались 8$, присланные анонимом. Мы очень рады и таким небольшим донациям, ведь за каждой из них - еще один человек, который поддержал нас.

[Присоединяйтесь к нашей кампании](https://www.generosity.com/medical-fundraising/let-s-build-a-clinic-for-locals-in-guatemala)'],
            ['id' => $item['text_id']]
        );

        /*******/
        // Tag for future news
        $this->insert('news_tags', ['title_id' => $this->makeString('мобильные бригады')]);
    }

    public function down()
    {
        echo "m160712_221252_add_news cannot be reverted.\n";

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
