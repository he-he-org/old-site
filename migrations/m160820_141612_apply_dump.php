<?php

use yii\db\Migration;

class m160820_141612_apply_dump extends Migration
{
    public function up()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m160820_141612_apply_dump.sql");
        $this->execute($sql);
    }

    public function down()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m160818_211015_apply_dump.sql");
        $this->execute($sql);
    }
}
