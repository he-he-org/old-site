<?php
/**
 * Created by IntelliJ IDEA.
 * User: koluch
 * Date: 07/07/16
 * Time: 00:24
 */

namespace app\migrations;


use yii\db\Migration;
use yii\db\Query;

class ExtMigration extends Migration
{
    public function makeString($ru = null, $en = null, $es = null) {
        $this->insert('i18n_strings', ['ru-RU' => $ru, 'en-US' => $en, 'es-ES' => $es]);
        return $this->getDb()->getLastInsertID();
    }

    public function makeText($ru = null, $en = null, $es = null) {
        $this->insert('i18n_texts', ['ru-RU' => $ru, 'en-US' => $en, 'es-ES' => $es]);
        return $this->getDb()->getLastInsertID();
    }

    public function findTag($ruText) {
        return (new Query())
            ->select("[[tags]].*")
            ->from("news_tags tags")
            ->join("inner join", "i18n_strings s", "tags.title_id = s.id")
            ->where("[[s]].[[ru-RU]] = '$ruText'")
            ->one($this->getDb());
    }

    public function findNewsItem($ruTitle) {
        return (new Query())
            ->select("[[news]].*")
            ->from("news news")
            ->join("inner join", "i18n_strings s", "news.title_id = s.id")
            ->where("[[s]].[[ru-RU]] = '$ruTitle'")
            ->one($this->getDb());
    }

}
