<?php

use yii\db\Migration;

class m161023_162049_add_texts_format_attr extends Migration
{
    public function up()
    {
        $this->addColumn("i18n_texts", "format", "ENUM('plain', 'markdown') NOT NULL DEFAULT 'markdown'");
    }

    public function down()
    {
        $this->dropColumn("i18n_texts", "format");
    }
}
