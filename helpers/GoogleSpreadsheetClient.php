<?php
/**
 * Created by IntelliJ IDEA.
 * User: koluch
 * Date: 24/10/16
 * Time: 00:54
 */

namespace app\helpers;


use Google_Service_Sheets;
use Google_Service_Sheets_ValueRange;

class GoogleSpreadsheetClient
{
    private $docid;
    private $client;
    private $service;

    function __construct ($docid, $client)
    {
        $this->docid = $docid;
        $this->client = $client;
        $this->service = new Google_Service_Sheets($client);
    }

    public function readCell($sheet, $cell) {
        $valueRange = $this->service->spreadsheets_values->get($this->docid, "${sheet}!${cell}:${cell}");
        return $valueRange->getValues()[0][0];
    }

    public function readRange($sheet, $range) {
        $valueRange = $this->service->spreadsheets_values->get($this->docid, "${sheet}!${range}");
        return $valueRange->getValues()[0][0];
    }

    public function updateCell($sheet, $cell, $value) {
        $rangeValue = new Google_Service_Sheets_ValueRange(array(
            'values' => [[$value]]
        ));
        $params = array(
            'valueInputOption' => 'RAW'
        );
        $this->service->spreadsheets_values->update($this->docid, "${sheet}!${cell}:${cell}", $rangeValue, $params);
    }

    public function updateRange($sheet, $range, $value) {
        $rangeValue = new Google_Service_Sheets_ValueRange(array(
            'values' => $value
        ));
        $params = array(
            'valueInputOption' => 'RAW'
        );
        $this->service->spreadsheets_values->update($this->docid, "${sheet}!${range}", $rangeValue, $params);
    }

    public function appendRange($sheet, $range, $value) {
        $rangeValue = new Google_Service_Sheets_ValueRange(array(
            'values' => $value
        ));
        $params = array(
            'valueInputOption' => 'RAW'
        );
        $this->service->spreadsheets_values->append($this->docid, "${sheet}!${range}", $rangeValue, $params);
    }

    function columnIndexToName($index) {
        $numeric = $index % 26;
        $letter = chr(65 + $numeric);
        $num2 = intval($index / 26);
        if ($num2 > 0) {
            return $this->columnIndexToName($num2 - 1) . $letter;
        } else {
            return $letter;
        }
    }
}
