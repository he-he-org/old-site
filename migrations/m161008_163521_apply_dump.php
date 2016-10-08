<?php

use yii\db\Migration;

class m161008_163521_apply_dump extends Migration
{
    public function up()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m161008_163521_apply_dump.sql");
        $this->execute($sql);
    }

    public function down()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m161008_155610_add_subscribe_form.sql");
        $this->execute($sql);
    }
}
