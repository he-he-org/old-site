<?php

use yii\db\Migration;

class m160715_215813_add_team_members extends Migration
{
    public function safeUp()
    {
        $data = [
            [
                'name' => 'Наталья Овчинникова',
                'photo_url' => '/images/main/members/natalia_ovchinnikova_4x3_small.jpg',
                'role' => 'Координация отдела переводов',
            ],
            [
                'name' => 'Татьяна Малкова',
                'photo_url' => '/images/main/members/tatiana_malkova_4x3_small.jpg',
                'role' => 'Переводчик',
            ],
            [
                'name' => 'Владимир Полуляхов',
                'photo_url' => '/images/main/members/vladimir_polulyakhov_4x3_small.jpg',
                'role' => 'Дизайнер',
            ],
            [
                'name' => 'Николай Мавренков',
                'photo_url' => '/images/main/members/nikolai_mavrenkov_4x3_small.jpg',
                'role' => 'Программист',
                'email' => 'koluch@koluch.ru',
                'fb' => 'https://www.facebook.com/profile.php?id=1717166686',
                'linked_in' => 'https://www.linkedin.com/in/nikolay-mavrenkov-5aab364b',
                'vk' => 'https://vk.com/id772744',
            ],
        ];

        foreach($data as $member) {
            $this->insert('i18n_strings', ['ru-RU' => $member['name'], 'en-US' => $member['name'], 'es-ES' => $member['name']]);
            $nameStringId = $this->getDb()->getLastInsertID();

            $this->insert('i18n_strings', ['ru-RU' => $member['role'], 'en-US' => $member['role'], 'es-ES' => $member['role']]);
            $roleStringId = $this->getDb()->getLastInsertID();

            unset($member['name']);
            unset($member['role']);

            $member['name_id'] = $nameStringId;
            $member['role_id'] = $roleStringId;
            
            $this->insert('members', $member);
        }

    }

    public function down()
    {
        echo "m160715_215813_add_team_members cannot be reverted.\n";

        return false;
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
