<?php

use yii\db\Migration;

/**
 * Handles the creation for table `i18n_texts`.
 */
class m160611_103729_create_i18n_texts extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('i18n_texts', [
            'name' => $this->string(100)->notNull(),
            'lang' => $this->char(5)->notNull(),
            'scope' => $this->string(100),
            'value' => $this->text(),
        ]);

        $this->addPrimaryKey('i18n_texts_pk', 'i18n_texts', ['name', 'lang']);
        $this->createIndex(
            'idx-i18n_texts-name',
            'i18n_texts',
            'name'
        );
        $this->createIndex(
            'idx-i18n_texts-lang',
            'i18n_texts',
            'lang'
        );

        $this->insert('i18n_texts', [
            'name' => 'main/intro',
            'lang' => 'ru-RU',
            'scope' => 'main',
            'value' => '# Благотворительный проект

В проекте Health&Help почти <b>сотня</b> людей объединилась для того, чтобы дать гватемальским индейцам
Майя доступ к базовой медицинской помощи. Работаем, чтобы помогать людям, а для покупки лекарств,
расходных материалов и оборудования нам нужна ваша помощь. Даже сто рублей могут помочь вылечить
человека'
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('i18n_texts');
    }
}
