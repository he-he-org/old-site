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
            'name' => $this->string(100)->notNull(),
            'lang' => $this->string(5)->notNull(),
            'value' => $this->string(1000),
        ]);
        $this->addPrimaryKey('i18n_strings_pk', 'i18n_strings', ['name', 'lang']);
        $this->createIndex(
            'idx-i18n_strings-name',
            'i18n_strings',
            'name'
        );
        $this->createIndex(
            'idx-i18n_strings-lang',
            'i18n_strings',
            'lang'
        );

        $this->batchInsert('i18n_strings', ['name', 'lang', 'value'], [
            ['layout/main-menu/about_us', 'ru-RU', 'О нас'],
            ['layout/main-menu/help', 'ru-RU', 'Помочь проекту'],
            ['layout/main-menu/volunteers', 'ru-RU', 'Стать волонтером'],
            ['layout/main-menu/news', 'ru-RU', 'Новости'],
            ['layout/main-menu/contacts', 'ru-RU', 'Контакты'],
            ['layout/main-menu/about_us', 'en-US', 'About us'],
            ['layout/main-menu/help', 'en-US', 'Help'],
            ['layout/main-menu/volunteers', 'en-US', 'Volunteers'],
            ['layout/main-menu/news', 'en-US', 'News'],
            ['layout/main-menu/contacts', 'en-US', 'Contacts'],
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
