/*
  Warnings:

  - You are about to drop the column `createdAt` on the `routine` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `routine` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `routine` table. All the data in the column will be lost.
  - You are about to drop the column `routineId` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `session_days_active` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `workout` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `workout` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `workout` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `routine` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `session_days_active` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exercise_id` to the `workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `routine` DROP FOREIGN KEY `routine_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_routineId_fkey`;

-- DropForeignKey
ALTER TABLE `session` DROP FOREIGN KEY `session_userId_fkey`;

-- DropForeignKey
ALTER TABLE `session_days_active` DROP FOREIGN KEY `session_days_active_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `workout` DROP FOREIGN KEY `workout_exerciseId_fkey`;

-- DropForeignKey
ALTER TABLE `workout` DROP FOREIGN KEY `workout_sessionId_fkey`;

-- DropForeignKey
ALTER TABLE `workout` DROP FOREIGN KEY `workout_userId_fkey`;

-- AlterTable
ALTER TABLE `routine` DROP COLUMN `createdAt`,
    DROP COLUMN `isActive`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `session` DROP COLUMN `routineId`,
    DROP COLUMN `userId`,
    ADD COLUMN `routine_id` VARCHAR(191) NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `session_days_active` DROP COLUMN `sessionId`,
    ADD COLUMN `session_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `workout` DROP COLUMN `exerciseId`,
    DROP COLUMN `sessionId`,
    DROP COLUMN `userId`,
    ADD COLUMN `exercise_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `session_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

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
