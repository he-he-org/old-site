<?php

use yii\db\Migration;

class m160703_120822_fix_texts extends Migration
{
    public function safeUp()
    {

        $this->update('i18n_texts', [
            'ru-RU' => '#### Взнос
Обязателен для всех, кроме волонтеров-строителей,
для них взнос желателен, но доброволен.

#### Проживание
Если вы будете волонтером-строителем, мы обеспечим
вас палаточным ночлегом и горячей едой
вне зависимости от срока вашего пребывания в лагере.

#### Питание

Основная пища в Гватемале - это рис, бобы, кукуруза, местные фрукты и овощи. У местных
жителей можно купить за 1$ кукурузные лепешки, бананы, яйца, мясо, сыр, все это нужно
заказывать у продавцов заранее. Мясо и сладости лучше захватить с собой или попросить
родственников выслать вам почтой.

#### Вакцинация

Собираясь в Гватемалу, нужно обязательно захватить с собой аптечку для экстренного лечения
 (мы поможем определиться с её составом). Кроме того, рекомендуется проверить наличие всех
 плановых прививок и вакцинации от гепатита В. До выезда необходимо провести вакцинацию
 от гепатита А, брюшного тифа и  бешенства.
'
        ], [
            'name' => 'help/volunteers/part2',
            'scope' => 'help',
        ]);

        $this->update('i18n_texts', [
            'ru-RU' =>

                '#### Другие специальности

Волонтерам других специальностей мы предоставляем место
для ночлега и питание в случае, если  они пробудут с нами более трех месяцев. Если вы хотите приехать к нам ненадолго, мы поможем вам
найти кров за минимальную цену (обычно 1-2$ в сутки).

#### Погода

В Гватемале не очень холодно и не очень жарко, температура держится на уровне +25.Однако,
стоит взять с собой свитер и ветровку - вечерами может быть холодно, особенно в горах.
Также не помешает захватить с собой резиновые сапоги и дождевик.

#### Виза и билеты

Гражданам России, желающим посетить Гватемалу на срок до трех месяцев, визу получать не
нужно. В консульстве Гватемалы можно продлить срок пребывания до полугода. Если вы планируете
пробыть у нас более полугода, мы можем посодействовать получению визы на больший срок или же
придется выехать в соседнюю страну и тут же въехать обратно.

Билет Москва-Гватемала-Москва при полете через США стоит от 700$, в этом случае вам может
потребоваться виза этой страны. Билеты по маршруту, не предусматривающему пересадок в США,
стоят дороже - от 850$.'
        ], [
            'name' => 'help/volunteers/part3',
            'scope' => 'help',
        ]);

    }

    public function down()
    {
        echo "m160703_120822_fix_texts cannot be reverted.\n";

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
