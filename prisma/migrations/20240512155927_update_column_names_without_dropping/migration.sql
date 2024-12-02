/*
  Warnings:

  - The column name `createdAt` on the `routine` table would be renamed to `created_at`
  - The column name `isActive` on the `routine` table would be renamed to `is_active`
  - The column name `userId` on the `routine` table would be renamed to `user_id`
  - The column name `routineId` on the `session` table would be renamed to `routine_id`
  - The column name `userId` on the `session` table would be renamed to `user_id`
  - The column name `sessionId` on the `session_days_active` table would be renamed to `session_id`
  - The column name `exerciseId` on the `workout` table would be renamed to `exercise_id`
  - The column name `sessionId` on the `workout` table would be renamed to `session_id`
  - The column name `userId` on the `workout` table would be renamed to `user_id`
*/

-- AlterTable
ALTER TABLE `routine` RENAME COLUMN `createdAt` TO `created_at`,
    RENAME COLUMN `isActive` TO `is_active`,
    RENAME COLUMN `userId` TO `user_id`;

-- AlterTable
ALTER TABLE `session` RENAME COLUMN `routineId` TO `routine_id`,
    RENAME COLUMN `userId` TO `user_id`;

-- AlterTable
ALTER TABLE `session_days_active` RENAME COLUMN `sessionId` TO `session_id`;

-- AlterTable
ALTER TABLE `workout` RENAME COLUMN `exerciseId` TO `exercise_id`,
    RENAME COLUMN `sessionId` TO `session_id`,
    RENAME COLUMN `userId` TO `user_id`;

-- AddForeignKey
ALTER TABLE `routine` ADD CONSTRAINT `routine_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_routine_id_fkey` FOREIGN KEY (`routine_id`) REFERENCES `routine`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session_days_active` ADD CONSTRAINT `session_days_active_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout` ADD CONSTRAINT `workout_exercise_id_fkey` FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout` ADD CONSTRAINT `workout_session_id_fkey` FOREIGN KEY (`session_id`) REFERENCES `session`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workout` ADD CONSTRAINT `workout_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
