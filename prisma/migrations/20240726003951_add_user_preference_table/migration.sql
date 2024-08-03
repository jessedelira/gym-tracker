-- CreateTable
CREATE TABLE `user_preference` (
    `id` VARCHAR(191) NOT NULL,
    `preference` ENUM('CONFETTI_ON_SESSION_COMPLETION') NOT NULL,
    `enabled` BOOLEAN NOT NULL DEFAULT true,
    `user_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_preference` ADD CONSTRAINT `user_preference_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
