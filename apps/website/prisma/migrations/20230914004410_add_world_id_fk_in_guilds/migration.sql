-- AlterTable
ALTER TABLE `guilds` ADD COLUMN `world_id` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX `ownerid` ON `guilds`(`ownerid`);

-- CreateIndex
CREATE INDEX `world_id` ON `guilds`(`world_id`);

-- CreateIndex
CREATE INDEX `name` ON `guilds`(`name`);

-- AddForeignKey
ALTER TABLE `guilds` ADD CONSTRAINT `guilds_world_id_fk` FOREIGN KEY (`world_id`) REFERENCES `worlds`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
