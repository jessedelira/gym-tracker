-- CreateTable
CREATE TABLE `user_setting` (
    `id` VARCHAR(191) NOT NULL,
    `timezone_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_setting_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timezone_map` (
    `id` VARCHAR(191) NOT NULL,
    `iana` VARCHAR(191) NOT NULL,
    `display` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `timezone_map_iana_key`(`iana`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_setting` ADD CONSTRAINT `user_setting_timezone_id_fkey` FOREIGN KEY (`timezone_id`) REFERENCES `timezone_map`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_setting` ADD CONSTRAINT `user_setting_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
