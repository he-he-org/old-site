<?php

use yii\db\Migration;

/**
 * Handles the creation for table `i18n`.
 */
class m160604_224942_create_i18n_strings extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('i18n_strings', [
            'id' => $this->primaryKey(),
            'name' => $this->string(100),
            'en-US' => $this->string(1000),
            'ru-RU' => $this->string(1000),
            'es-ES' => $this->string(1000),
        ]);

        $this->createIndex(
            'idx-i18n_strings-name',
            'i18n_strings',
            'name'
        );

        $this->batchInsert('i18n_strings', ['name', 'ru-RU', 'en-US'], [
            ['layout/main-menu/about_us', 'О нас', 'About us'],
            ['layout/main-menu/help', 'Помочь проекту', 'Help'],
            ['layout/main-menu/volunteers', 'Стать волонтером', 'Volunteers'],
            ['layout/main-menu/news', 'Новости', 'News'],
            ['layout/main-menu/contacts', 'Контакты', 'Contacts'],
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('i18n_strings');
    }
}
