<?php

use yii\db\Migration;

class m160818_211015_apply_dump extends Migration
{
    public function up()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m160818_211015_apply_dump.sql");
        $this->execute($sql);
    }

    public function down()
    {
        $sql = file_get_contents(__DIR__ . "/dumps/m160817_220339_apply_dump.sql");
        $this->execute($sql);
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
