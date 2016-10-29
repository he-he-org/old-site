<?php

use yii\db\Migration;

/**
 * Handles the creation of table `volunteers_questionnaire`.
 */
class m161029_074244_create_questionnaire_table extends Migration
{
    /**
     * @inheritdoc
     */
    public function up()
    {
        $this->createTable('volunteers_questionnaire_responses', [
            'id' => $this->primaryKey(),
            'body' => $this->text(),
            'created' => $this->timestamp()->defaultExpression('CURRENT_TIMESTAMP'),
        ]);
    }

    /**
     * @inheritdoc
     */
    public function down()
    {
        $this->dropTable('volunteers_questionnaire_responses');
    }
}
