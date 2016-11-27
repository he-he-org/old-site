<?php
namespace app\modules\api\components;


use Yii;
use yii\data\ActiveDataProvider;
use yii\web\BadRequestHttpException;

trait RestSearchController
{
    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [$this, 'indexPrepareDataProvider'];
        return $actions;
    }

    public function indexPrepareDataProvider()
    {
        function startsWith($haystack, $needle) {
            return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== false;
        }

        function endsWith($haystack, $needle) {
            return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== false);
        }

        $class = $this->modelClass;

        $tableSchema = $class::getTableSchema();

        $table = $tableSchema->fullName;

        $query = $class::find();

        $q = Yii::$app->request->get('q', '');


        if ($q !== '') {
            $conditionArray = ['and'];
            foreach(explode(';', $q) as $cond) {
                if (preg_match('/^(.+):(.+)$/', $cond, $keyValue) !== 1) {
                    throw new BadRequestHttpException("Bad condition format: '$cond' (it should be 'key:value')");
                }

                $key = $keyValue[1];
                $value = $keyValue[2];

                $attrPath = explode(".", $key);
                if (count($attrPath) === 1) {
                    if ($tableSchema->getColumn($key) === null) {
                        throw new BadRequestHttpException("Attribute '$key' doesn't exists");
                    }
                    $attr = "[[$table]].[[$key]]";
                }
                else if(count($attrPath) === 2) {
                    $relation = $attrPath[0];
                    $relationColumn = $attrPath[1];

                    if ($tableSchema->getColumn("${relation}_id") === null) {
                        throw new BadRequestHttpException("Relation '$relation' doesn't exists");
                    }

                    $filteredRelation = array_filter($tableSchema->foreignKeys, function ($foreignKey) use ($relation) {
                        return array_key_exists("${relation}_id", $foreignKey);
                    });

                    if (count($filteredRelation) < 1) {
                        throw new BadRequestHttpException("Relation '$relation' isn't described in DB");
                    }

                    $filteredRelation = $filteredRelation[0];

                    $relationTableSchema = Yii::$app->db->getTableSchema($filteredRelation[0]);
                    if ($relationTableSchema->getColumn($relationColumn) === null) {
                        throw new BadRequestHttpException(
                            "Attribute '$relationColumn' doesn't exists in relation '$relation'"
                        );
                    }

                    $attr = "[[$relation]].[[$relationColumn]]";
                }
                else {
                    throw new BadRequestHttpException("Argument path has a wrong format: '$key'");
                }

                if(strpos($value, '*') !== false) {
                    array_push($conditionArray, ['like', $attr, str_replace('*', '%', $value), false]);
                }
                else if(startsWith($value, '<=') || startsWith($value, '>=')) {
                    array_push($conditionArray, [substr($value, 0, 2), $attr, substr($value, 2)]);
                }
                else if(startsWith($value, '<') || startsWith($value, '>')) {
                    array_push($conditionArray, [substr($value, 0, 1), $attr, substr($value, 1)]);
                }
                else {
                    if (preg_match('/^\\[((?:[^,]+,)*(?:[^,]+))\\]$/', $value, $valueList) === 1) {
                        $values = explode(",", $valueList[1]);
                        array_push($conditionArray, [$attr => $values]);
                    }
                    else {
                        array_push($conditionArray, [$attr => $value]);
                    }
                }
            }
            $query->where($conditionArray);
        }


        $extend = Yii::$app->request->get('extend', '');

        if ($extend !== '') {
            $query->joinWith(array_map(function($name){return "$name $name";}, explode(',', $extend)));
        }

        //todo: wrap with catch and throw 500
        return new ActiveDataProvider([
            'query' => $query,
        ]);
    }
}
