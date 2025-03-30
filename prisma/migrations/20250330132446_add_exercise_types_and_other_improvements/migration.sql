/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `routine` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `type` to the `exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `routine` DROP FOREIGN KEY `routine_user_id_fkey`;

-- DropIndex
DROP INDEX `routine_name_key` ON `routine`;

-- DropIndex
DROP INDEX `routine_user_id_fkey` ON `routine`;

-- AlterTable
ALTER TABLE `exercise` ADD COLUMN `type` ENUM('WEIGHTED', 'DURATION') NOT NULL;

-- AlterTable
ALTER TABLE `workout` ADD COLUMN `duration_seconds` INTEGER NULL,
    MODIFY `reps` INTEGER NULL,
    MODIFY `sets` INTEGER NULL,
    MODIFY `weight_lbs` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `routine_name_user_id_key` ON `routine`(`name`, `user_id`);

-- AddForeignKey
ALTER TABLE `routine` ADD CONSTRAINT `routine_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
