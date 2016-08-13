<div class="team-member row_block-2">
    <img src="<?= $photo_url ?>" class="team-member_photo"/>
    <div class="team-member_name"><?= $name ?></div>
    <div class="team-member_role"><?= $role ?></div>
    <div class="team-member_links">
        <?php if($vk) {?> <a href="<?= $vk ?>" class="fa fa-vk team-member_link "></a> <?php } ?>
        <?php if($fb) {?> <a href="<?= $fb ?>" class="fa fa-facebook team-member_link "></a> <?php } ?>
        <?php if($email) {?> <a href="<?= $email ?>" class="fa fa-envelope team-member_link "></a> <?php } ?>
        <?php if($linked_in) {?> <a href="<?= $linked_in ?>" class="fa fa-linkedin team-member_link "></a> <?php } ?>
    </div>
</div>
