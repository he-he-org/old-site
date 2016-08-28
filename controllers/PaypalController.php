<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use GuzzleHttp\Psr7;

class PaypalController extends Controller
{
    static $PAYPAL_CLIENT_ID;
    static $PAYPAL_SECRET;
    static $PAYPAL_MODE;


    public $defaultAction = 'main';

//    public function beforeAction($action) {
//        $this->enableCsrfValidation = $action->id !== 'login' && $action->id !== 'logout' && $action->id !== 'user';
//        return parent::beforeAction($action);
//    }

    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    public function actionMain()
    {
        $this->layout = 'empty';

        $request = Yii::$app->request;

        $amount = $request->get('amount'); //todo: check for exist
        $currency = $request->get('currency');


        $HOST = self::$PAYPAL_MODE === 'live' ? "https://api.paypal.com" : "https://api.sandbox.paypal.com";

        $client = new \GuzzleHttp\Client(['base_uri' => $HOST]);

        try {

            // Auth
            $response = $client->request("POST", '/v1/oauth2/token', [
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-type' => 'x-www-form-urlencoded',
                ],
                'auth' => [self::$PAYPAL_CLIENT_ID, self::$PAYPAL_SECRET],
                'body' => 'grant_type=client_credentials'
            ]);
            $json_response = json_decode($response->getBody()->getContents());
            $access_token = $json_response->access_token;

            // Create payment
            $response = $client->request("POST", '/v1/payments/payment', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $access_token,
                ],
                'body' => '{
                             "intent": "sale",
                             "redirect_urls":
                                 {
                                   "return_url": "http://localhost:3000/paypal/return",
                                   "cancel_url": "http://localhost:3000/paypal/cancel"
                                 },
                             "payer":
                             {
                               "payment_method": "paypal"
                             },
                             "transactions": [
                             {
                               "amount":
                               {
                                 "total": "' . $amount . '",
                                 "currency": "' . $currency . '"
                               },
                               "description": "This is the payment transaction description."
                             }]
                           }'
            ]);

            $json_response = json_decode($response->getBody()->getContents());

            $links = $json_response->links;
            $approval_url = array_filter($links, function ($x) {return $x->rel === 'approval_url';})[1];
            $this->redirect($approval_url->href);

        } catch (\GuzzleHttp\Exception\RequestException $e) {
            Yii::error(
                "Error happend while creating payment\n"
                . Psr7\str($e->getRequest()) . "\n\n"
                . Psr7\str($e->getResponse())
            );
            return $this->renderContent("Unknown error happend while executing your payment"); //todo: translate
        }
    }

    public function actionReturn()
    {
        $this->layout = 'main';

        $request = Yii::$app->request;

        $paymentId = $request->get('paymentId'); //todo: check for exist
        $payerID = $request->get('PayerID');

        $HOST = self::$PAYPAL_MODE === 'sandbox' ? "https://api.sandbox.paypal.com" : "https://api.paypal.com";
        $client = new \GuzzleHttp\Client(['base_uri' => $HOST]);
        try {

            // Auth
            $response = $client->request("POST", '/v1/oauth2/token', [
                'headers' => [
                    'Accept' => 'application/json',
                    'Content-type' => 'x-www-form-urlencoded',
                ],
                'auth' => [self::$PAYPAL_CLIENT_ID, self::$PAYPAL_SECRET],
                'body' => 'grant_type=client_credentials'
            ]);
            $json_response = json_decode($response->getBody()->getContents());
            $access_token = $json_response->access_token;

            // Create payment
            $response = $client->request("POST", '/v1/payments/payment/' . $paymentId . '/execute/', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => 'Bearer ' . $access_token,
                ],
                'body' => '{ "payer_id" : "' . $payerID . '" }'
            ]);

            $json_response = json_decode($response->getBody()->getContents());

            $state = $json_response->state;
            if ($state === 'approved') {
                return $this->renderContent("<b>Thank you! You donation successfuly approved!</b>"); //todo: translate
            }
            else {
                return $this->renderContent("<b>Something has gone wrong while executing you payment! Please, try again...</b>"); //todo: translate
            }
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            $response = $e->getResponse();
            $json_response = json_decode($response->getBody()->getContents());
            if ($json_response->name === 'PAYMENT_ALREADY_DONE') {
                return $this->renderContent("This payment is already confirmed"); //todo: translate
            }
            else {

                Yii::error(
                    "Error happend while creating payment\n"
                    . "Request:\n". Psr7\str($e->getRequest())
                    . "\n\nResponse:\n". Psr7\str($e->getResponse())
                );

                return $this->renderContent("Unknown error happend while executing your payment"); //todo: translate
            }
        }
    }

    public function actionCancel()
    {
        $this->layout = 'main';
        return $this->renderContent("<i>You transation was canceled...</i>");
    }

}

$config = parse_ini_file(__DIR__ . '/../env.ini', true);
PaypalPaymentController::$PAYPAL_CLIENT_ID = @$config['paypal_client_id'] ?: null;
PaypalPaymentController::$PAYPAL_SECRET = @$config['paypal_secret'] ?: null;
PaypalPaymentController::$PAYPAL_MODE = @$config['paypal_mode'] ?: "sandbox";



