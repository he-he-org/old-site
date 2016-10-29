<?php
namespace app\controllers;


use app\helpers\GoogleSpreadsheetClient;
use app\models\VolunteersQuestionnaireResponse;
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
        else if ($item['type'] === 'date') {
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
        $config = parse_ini_file(Yii::getAlias('@app') .  '/env.ini', true);

        Yii::$app->language = 'ru-RU';

        $settings = json_decode(\Yii::t('texts', 'help/volunteers/questionnaire/settings'), true);
        $response = json_decode(Yii::$app->request->getRawBody(), true);

        if ($settings['version'] !== $response['version']) {
            throw new BadRequestHttpException('Questionnaire and response versions are different');
        }

        // Save response to database
        $volunteersQuestionnaireResponse = new VolunteersQuestionnaireResponse();
        $volunteersQuestionnaireResponse->body = Yii::$app->request->getRawBody();
        $volunteersQuestionnaireResponse->save();

        $pages = $settings['pages'];
        $answers = $response['answers'];

        $userData = $this->buildData($pages, $answers);

        $DOC_ID = @$config['questionnaire_google_docid'] ?: null;
        $SHEET = 'version' . $settings['version'];

        define('APPLICATION_NAME', 'Google Sheets API PHP Quickstart');
        define('CLIENT_SECRET_PATH', Yii::getAlias('@app') . '/google-secret.json');
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

        // Generate answer row and append it to a table
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
