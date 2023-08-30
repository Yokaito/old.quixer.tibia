/*
  Warnings:

  - You are about to drop the column `mainCharacter` on the `players` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `players` DROP COLUMN `mainCharacter`,
    ADD COLUMN `main` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `world_id` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `worlds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `creation` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `location` VARCHAR(255) NOT NULL DEFAULT '',
    `pvp_type` INTEGER NOT NULL DEFAULT 0,
    `premium_type` INTEGER NOT NULL DEFAULT 0,
    `transfer_type` INTEGER NOT NULL DEFAULT 0,
    `battle_eye` BOOLEAN NOT NULL DEFAULT false,
    `world_type` INTEGER NOT NULL DEFAULT 0,
    `ip` VARCHAR(255) NOT NULL,
    `port` INTEGER NOT NULL,

    UNIQUE INDEX `worlds_name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL DEFAULT 1,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `group_id` ON `players`(`group_id`);

-- CreateIndex
CREATE INDEX `world_id` ON `players`(`world_id`);

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_worlds_fk` FOREIGN KEY (`world_id`) REFERENCES `worlds`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_group_fk` FOREIGN KEY (`group_id`) REFERENCES `player_groups`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
