<div class="category-menu">
    <?php foreach ($items as $item) { ?>
        <div class="category-menu_item<?= (array_key_exists('active', $item) && $item['active']) ? ' category-menu_item--active' : '' ?>"><?= $item['title'] ?></div>
    <?php } ?>
</div>
