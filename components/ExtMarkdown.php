<?php
namespace app\components;

use Yii;

function startsWith($haystack, $needle) {
    // search backwards starting from haystack length characters from the end
    return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== false;
}

function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== false);
}

class ExtMarkdown extends \cebe\markdown\GithubMarkdown
{
    protected function identifyRow($line, $lines, $current)
    {
        $startMatches = substr($line, 0, 2) === '| ';
        $isLastLine = $current === count($lines) - 1;
        $isNotTable = $isLastLine || preg_match ('/^\|?\s*\-+\s*\|?$/', $lines[$current + 1]) === 0;
        if ($startMatches && $isNotTable) {
            return true;
        }
        return false;
    }

    protected function consumeRow($lines, $current)
    {
        $block = [
            'row',
            'content' => $lines[$current],
        ];
        return [$block, $current + 1];
    }

    protected function renderRow($block)
    {

        $parts = explode('|', $block['content']);
        $parts = array_map(function($value) {  return trim($value); }, $parts);
        $parts = array_filter($parts, function($value) {  return $value !== ''; });
        $parts = array_map(function($value) {  return '<span>' . $value . '</span>'; }, $parts);
        return "<p class='row'>" . join('', $parts) . "</p>";
    }


    protected function renderLink($block)
    {
        if (isset($block['refkey'])) {
            if (($ref = $this->lookupReference($block['refkey'])) !== false) {
                $block = array_merge($block, $ref);
            } else {
                return $block['orig'];
            }
        }
        $url = $block['url'];

        if (startsWith($url, "/") && !(startsWith($url, "/ru") || startsWith($url, "/en") || startsWith($url, "/es"))) {
            $url = '/' . Yii::$app->request->getLang() . $url;
        }

        return '<a href="' . htmlspecialchars($url, ENT_COMPAT | ENT_HTML401, 'UTF-8') . '"'
        . (empty($block['title']) ? '' : ' title="' . htmlspecialchars($block['title'], ENT_COMPAT | ENT_HTML401 | ENT_SUBSTITUTE, 'UTF-8') . '"')
        . '>' . $this->renderAbsy($block['text']) . '</a>';

    }
}
