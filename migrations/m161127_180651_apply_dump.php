<?php

use yii\db\Migration;

class m161127_180651_apply_dump extends Migration
{
    public function up()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m161127_180651_apply_dump.sql");
        $this->execute($sql);
    }

    public function down()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m161104_164329_apply_dump.sql");
        $this->execute($sql);
    }
}
