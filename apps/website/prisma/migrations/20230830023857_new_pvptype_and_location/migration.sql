/*
  Warnings:

  - You are about to alter the column `location` on the `worlds` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Int`.

*/
-- AlterTable
ALTER TABLE `worlds` MODIFY `location` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `world_pvptype` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `clientType` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `serverType` VARCHAR(255) NOT NULL DEFAULT 'no-pvp',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `world_location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `location` ON `worlds`(`location`);

-- CreateIndex
CREATE INDEX `pvp_type` ON `worlds`(`pvp_type`);

-- AddForeignKey
ALTER TABLE `worlds` ADD CONSTRAINT `worlds_world_location_fk` FOREIGN KEY (`location`) REFERENCES `world_location`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `worlds` ADD CONSTRAINT `worlds_world_pvptype_fk` FOREIGN KEY (`pvp_type`) REFERENCES `world_pvptype`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
