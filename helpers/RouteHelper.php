<?php
/**
 * Date: 28/05/16
 * Time: 14:23
 */
namespace app\helpers;

class RouteHelper
{

    private static $regexp = '/^\/?(.*?)\/?(?:\/(.+?)\/?)?$/';

    public static function getPage($url, $default = '') {
        preg_match(self::$regexp, $url, $matches);
        if (count($matches) < 2 || $matches[1] === '') {
            return $default;
        }
        else {
            return $matches[1];
        }
    }

    public static function getSection($url, $default = '') {
        preg_match(self::$regexp, $url, $matches);
        if (count($matches) < 3 || $matches[2] === '') {
            return $default;
        }
        else {
            return $matches[2];
        }
    }
}
