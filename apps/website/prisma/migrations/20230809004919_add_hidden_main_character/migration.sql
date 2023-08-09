-- AlterTable
ALTER TABLE `players` ADD COLUMN `ishidden` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `mainCharacter` BOOLEAN NOT NULL DEFAULT false;
