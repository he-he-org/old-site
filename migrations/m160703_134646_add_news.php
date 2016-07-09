<?php

use app\migrations\ExtMigration;
use app\models\NewsTag;
use yii\db\Migration;
use yii\db\Query;

class m160703_134646_add_news extends ExtMigration
{
    
    
    public function safeUp()
    {
        // Insert tags
        $this->insert('news_tags', ['title_id' => $this->makeString('краудфандинг 2')]);
        $tagId = $this->getDb()->getLastInsertID();

        $buildingTagId = $this->findTag("строительство")['id'];

        // Insert news
        $this->insert('news', [
            'date' => '2016-06-28',
            'title_id' => $this->makeString('Health&Help запускает краудфандинг кампанию'),
            'text_id' => $this->makeText(
                'Уже почти год, как мы начали проект, посвященный строительству клиники в Гваетмале. Тысячи людей помогали и продолжают помогать нам в этой истории: делают пожертвования, посылают посылки, распространяют информацию в соцсетях или становятся волонтерами. И вот, все готово: мы в Гватемале и уже в июле начинаем строить. Осталось совсем немного: собрать деньги на второй этап строительства, функционирование клиники и организацию медицинских бригад.

Мы запускаем краудфандинг на международной платформе. Поддержите нас: сделайте пожертвование и распространите посты в соцсетях:

[Facebook](https://www.facebook.com/healthandhelporg/posts/603310439832722​)  
[ВКонтакте](https://vk.com/heandhe?w=wall-99809841_463/all​)  
[LiveJournal](http://tropical-doc.livejournal.com/34257.html​)

Изменить жизнь 15 000 человек к лучшему: http://bit.ly/hehe-together'),
            'image_url' => '/images/news/2UpfyKHwA3k-2-40850.jpg',
        ]);
        $firstItemId = $this->getDb()->getLastInsertID();

        // Insert news
        $this->insert('news', [
            'date' => '2016-06-29',
            'title_id' => $this->makeString('Первые новости о ходе кампании'),
            'text_id' => $this->makeText(
                'Уже 50 человек сделали пожертвования на наш проект! Пятидесятым пожертвованием оказались 8$, присланные анонимом. Мы очень рады и таким небольшим донациям, ведь за каждой из них - еще один человек, который поддержал нас.

Присоединяйтесь к нашей кампании: http://bit.ly/hehe-together'),
            'image_url' => '/images/news/2UpfyKHwA3k-2-40850.jpg',
        ]);
        $secondItemId = $this->getDb()->getLastInsertID();

        // Make connection
        $this->insert('news_news_tags', [ 'news_id' => $firstItemId, 'news_tags_id' => $tagId,]);
        $this->insert('news_news_tags', [ 'news_id' => $firstItemId, 'news_tags_id' => $buildingTagId,]);
        $this->insert('news_news_tags', [ 'news_id' => $secondItemId, 'news_tags_id' => $tagId,]);
        $this->insert('news_news_tags', [ 'news_id' => $secondItemId, 'news_tags_id' => $buildingTagId,]);

        
        /********/
        // Remove lorem ipsum
        $item = $this->findNewsItem('The standard Lorem Ipsum passage');
        $this->delete('news', ['id' => $item['id']]);
        $this->delete('i18n_strings', ['id' => $item['title_id']]);
        $this->delete('i18n_texts', ['id' => $item['text_id']]);
    }

    public function down()
    {
        echo "m160703_134646_add_news cannot be reverted.\n";

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
