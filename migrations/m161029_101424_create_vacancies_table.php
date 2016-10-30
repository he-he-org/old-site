<?php

use yii\db\Migration;

/**
 * Handles the creation of table `vacancy`.
 */
class m161029_101424_create_vacancies_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('vacancies', [
            'id' => $this->primaryKey(),
            'title_id' => $this->integer()->notNull(),
            'body_id' => $this->integer()->notNull(),
        ]);

        $this->addForeignKey(
            'fk-vacancies-title_id',
            'vacancies',
            'title_id',
            'i18n_strings',
            'id'
        );

        $this->addForeignKey(
            'fk-vacancies-body_id',
            'vacancies',
            'body_id',
            'i18n_texts',
            'id'
        );
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('vacancies');
    }
}
