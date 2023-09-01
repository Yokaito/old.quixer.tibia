/*
  Warnings:

  - Added the required column `clientValue` to the `world_location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `world_location` ADD COLUMN `clientValue` VARCHAR(255) NOT NULL;
