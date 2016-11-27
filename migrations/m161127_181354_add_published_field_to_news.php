<?php

use yii\db\Migration;

class m161127_181354_add_published_field_to_news extends Migration
{
    public function up()
    {
        $this->addColumn("news", "published", \yii\db\Schema::TYPE_BOOLEAN." DEFAULT FALSE");
        $this->update("news", ["published" => true]);
    }

    public function down()
    {
        $this->dropColumn("news", "published");
    }
}
