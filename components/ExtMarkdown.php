<?php
namespace app\components;

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
        return "<div class='row'>" . join('', $parts) . "</div>";
    }
}
