<?php

use yii\db\Migration;

class m161104_161309_apply_dump extends Migration
{
    public function up()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m161104_161309_apply_dump.sql");
        $this->execute($sql);
    }

    public function down()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m161023_162024_apply_dump.sql");
        $this->execute($sql);
    }
}
