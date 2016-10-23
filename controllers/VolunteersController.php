<?php
/**
 * Created by IntelliJ IDEA.
 * User: koluch
 * Date: 16/10/16
 * Time: 01:10
 */

namespace app\controllers;


use app\helpers\GoogleSpreadsheetClient;
use Google_Client;
use Google_Service_Sheets;
use Google_Service_Sheets_ValueRange;
use Google_Service_Sheets_ValueServiceOptions;
use Yii;
use yii\base\Exception;
use yii\web\BadRequestHttpException;
use yii\web\Controller;
use GuzzleHttp\Psr7;
use yii\web\HttpException;

class VolunteersController extends Controller
{
    public function beforeAction($action) {
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

    private function buildItemData($item, $answer) {
        $result = [];
        if ($item['type'] === 'text') {
            array_push($result, ['question' => $item['title'], 'answer' => $answer]);
        }
        else if ($item['type'] === 'checkbox') {
            array_push($result, ['question' => $item['title'], 'answer' => $answer ? 'да' : 'нет']);
        }
        else if ($item['type'] === 'textarea') {
            array_push($result, ['question' => $item['title'], 'answer' => $answer]);
        }
        else if ($item['type'] === 'group') {
            if ($item['subtype'] === 'checkbox') {
                foreach($item['items'] as $subitem) {
                    $answerTexts = [];
                    foreach($item['options'] as $option) {
                        if ($answer[$subitem['name']][$option['name']] === true) {
                            array_push($answerTexts, $option['title']);
                        }
                    }
                    array_push($result, ['question' => $subitem['title'], 'answer' => implode(', ', $answerTexts)]);
                }
            }
            else if ($item['subtype'] === 'scale') {
                foreach($item['items'] as $subitem) {
                    array_push($result, ['question' => $subitem['title'], 'answer' => $answer[$subitem['name']]]);
                }
            }
        }
        else if ($item['type'] === 'radio') {
            $answerOption = array_values(array_filter($item['options'], function ($option) use ($answer) {
                return $option['value'] === $answer;
            }))[0];
            array_push($result, ['question' => $item['title'], 'answer' => $answerOption['title']]);
        }
        return $result;
    }


    private function buildPageData($page, $answers) {
        return $this->buildItemListData($page['items'], $answers[$page['name']]);
    }

    private function buildItemListData($itemList, $answers) {
        $result = [];
        foreach($itemList as $item) {
            if (isset($item['name'])) {
                $result = array_merge($result, $this->buildItemData($item, $answers[$item['name']]));
            }
            else if ($item['type'] === 'row') {
                $result = array_merge($result, $this->buildItemListData($item['content'], $answers));
            }
        }
        return $result;
    }

    private function buildData($pages, $answers) {
        $result = [];
        foreach($pages as $page) {
            $result = array_merge($result, $this->buildPageData($page, $answers));
        }
        return $result;
    }

    public function actionSendQuestionnaire() {
        Yii::$app->language = 'ru-RU';

        $settings = json_decode(\Yii::t('texts', 'help/volunteers/questionnaire/settings'), true);
        $response = json_decode(Yii::$app->request->getRawBody(), true);

        if ($settings['version'] !== $response['version']) {
            throw new BadRequestHttpException('Questionnaire and response versions are different');
        }

        $pages = $settings['pages'];
        $answers = $response['answers'];


        $userData = $this->buildData($pages, $answers);


        $DOC_ID = '10cusn5iM81h-7Av6gl_WZtIlBW5K6PbdEVFa9S4F2pM';
        $SHEET = 'Sheet1';

        define('APPLICATION_NAME', 'Google Sheets API PHP Quickstart');
        define('CLIENT_SECRET_PATH', '/vagrant/he-he-nmm-test-f88945dfef28.json');
        define('SCOPES', implode(' ', array(
            Google_Service_Sheets::SPREADSHEETS)
        ));

        $client = new Google_Client();
        $client->setApplicationName(APPLICATION_NAME);
        $client->setScopes(SCOPES);
        $client->setAuthConfig(CLIENT_SECRET_PATH);
        $client->setAccessType('offline');


        // Get the API client and construct the service object.
        $spreadsheet = new GoogleSpreadsheetClient($DOC_ID, $client);

        // Generate header it it doesn't exists
        $value = $spreadsheet->readCell($SHEET, 'A1');
        if ($value === null) {
            $header = ['language'];
            foreach($userData as $item) {
                array_push($header, $item['question']);
            }
            if (count($header) < 0) {
                throw new BadRequestHttpException('It should be at least one answer to generate table header');
            }
            $spreadsheet->updateRange(
                $SHEET,
                'A1:' . $spreadsheet->columnIndexToName(count($header) - 1) .  '1',
                [$header]
            );
        }

        // Generate answer row and append it to table
        $row = [$answers['language']];
        foreach($userData as $item) {
            array_push($row, $item['answer']);
        }
        if (count($row) < 0) {
            throw new BadRequestHttpException('It should be at least one answer to write response');
        }
        $spreadsheet->appendRange(
            $SHEET,
            'A1:' . $spreadsheet->columnIndexToName(count($row) - 1) .  '1',
            [$row]
        );

    }
}





//        throw new HttpException(500, 'FUCK');

//        $FORM_ID = '18133LO0qisPyGZePz-w8oOVS4ZooKGvaLJgECDLbx30';
//
//
//        $HOST = "https://docs.google.com/";
//
//        $client = new \GuzzleHttp\Client(['base_uri' => $HOST]);
//
//        $scheme = [
//            'q1' => [
//                'id' => '512987737',
//                'type' => 'radio',
//                'options' => ['radio-op1', 'radio-op2'],
//                'other' => true,
//            ],
//            'q2' => [
//                'id' => '343341468',
//                'type' => 'checkbox',
//                'options' => ['checkbox-op1', 'checkbox-op2'],
//                'other' => true,
//            ],
//            'q3' => [
//                'id' => '1155195382',
//                'type' => 'dropdown',
//                'options' => ['dropdown-op1', 'dropdown-op2'],
//            ],
//            'q4' => [
//                'id' => '960264317',
//                'type' => 'short',
//            ],
//            'q5' => [
//                'id' => '585141789',
//                'type' => 'para',
//            ],
//            'q6' => [
//                'id' => '707303395',
//                'type' => 'scale',
//            ],
//            'q7' => [
//                'id' => '257310822',
//                'type' => 'grid-row',
//                'options' => ['multi-choice-grid_col1', 'multi-choice-grid_col2'],
//            ],
//            'q8' => [
//                'id' => '1829064355',
//                'type' => 'grid-row',
//                'options' => ['multi-choice-grid_col1', 'multi-choice-grid_col2'],
//            ],
//        ];
//
//        $answers = [
//            'q1' => 1,
//            'q2' => 'custom answer2',
//            'q3' => 1,
//            'q4' => 'short answer example!!!',
//            'q5' => 'para answer example!!!',
//            'q6' => 5,
//            'q7' => 1,
//            'q8' => 0,
//        ];
//
//        $params = [
//            'submit' => 'Submit',
//        ];
//
//        foreach ($answers as $k=>$v ) {
//            $question = $scheme[$k];
//            if ($question['type'] === 'radio') {
//                if (is_numeric($v) && $v < count($question['options'])) {
//                    $params['entry.' . $question['id']] =  $question['options'][$v];
//                    if ($question['other']) {
//                        $params['entry.' . $question['id'] . '.other_option_response'] = '';
//                    }
//                }
//                else if (is_string($v) && $question['other']) {
//                    $params['entry.' . $question['id']] = '__other_option__';
//                    $params['entry.' . $question['id'] . '.other_option_response'] = $v;
//                }
//                else {
//                    throw new Exception("Bad value '$v' for question '$k'");
//                }
//            }
//            else if ($question['type'] === 'checkbox') {
//                if (is_numeric($v) && $v < count($question['options'])) {
//                    $params['entry.' . $question['id']] =  $question['options'][$v];
//                    if ($question['other']) {
//                        $params['entry.' . $question['id'] . '.other_option_response'] = '';
//                    }
//                }
//                else if (is_string($v) && $question['other']) {
//                    $params['entry.' . $question['id']] = '__other_option__';
//                    $params['entry.' . $question['id'] . '.other_option_response'] = $v;
//                }
//                else {
//                    throw new Exception("Bad value '$v' for question '$k'");
//                }
//            }
//            else if ($question['type'] === 'dropdown') {
//                if (is_numeric($v) && $v < count($question['options'])) {
//                    $params['entry.' . $question['id']] =  $question['options'][$v];
//                }
//                else {
//                    throw new Exception("Bad value '$v' for question '$k'");
//                }
//            }
//            else if ($question['type'] === 'short') {
//                $params['entry.' . $question['id']] = ''.$v;
//            }
//            else if ($question['type'] === 'para') {
//                $params['entry.' . $question['id']] = ''.$v;
//            }
//            else if ($question['type'] === 'scale') {
//                if (is_numeric($v)) {
//                    $params['entry.' . $question['id']] = $v;
//                }
//            }
//            else if ($question['type'] === 'scale') {
//                if (is_numeric($v)) {
//                    $params['entry.' . $question['id']] = $v;
//                }
//            }
//            else if ($question['type'] === 'grid-row') {
//                if (is_numeric($v) && $v < count($question['options'])) {
//                    $params['entry.' . $question['id']] =  $question['options'][$v];
//                }
//                else {
//                    throw new Exception("Bad value '$v' for question '$k'");
//                }
//            }
//            else {
//                throw new Exception("Unknown question type: " . $question['type']);
//            }
//        }
//
//        try {
//            // Auth
//            $response = $client->request("POST", "/forms/d/$FORM_ID/formResponse", [
//                'form_params' => $params
//            ]);
//            var_dump($params);
//            echo "<h1>Done</h1>";
//            echo "<pre>" .  $response->getBody()->getContents() . "</pre>";
//
//        } catch (\GuzzleHttp\Exception\RequestException $e) {
//            Yii::error(
//                "Error happend while creating payment\n"
//                . Psr7\str($e->getRequest()) . "\n\n"
//                . Psr7\str($e->getResponse())
//            );
//            return $this->renderContent("Unknown error happend while executing your payment"); //todo: translate
//        }
