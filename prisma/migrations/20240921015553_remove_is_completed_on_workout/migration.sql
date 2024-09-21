/*
  Warnings:

  - You are about to drop the column `is_completed_on_active_session` on the `workout` table. All the data in the column will be lost.
  - You are about to drop the column `weightLbs` on the `workout` table. All the data in the column will be lost.
  - Added the required column `weight_lbs` to the `workout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `workout` DROP COLUMN `is_completed_on_active_session`,
    DROP COLUMN `weightLbs`,
    ADD COLUMN `weight_lbs` INTEGER NOT NULL;
