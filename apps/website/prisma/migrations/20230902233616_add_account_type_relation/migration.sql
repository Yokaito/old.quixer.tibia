/*
  Warnings:

  - You are about to alter the column `type` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `UnsignedTinyInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `accounts` MODIFY `type` INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE `account_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `account_type_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `type` ON `accounts`(`type`);

-- AddForeignKey
ALTER TABLE `accounts` ADD CONSTRAINT `accounts_account_type_fk` FOREIGN KEY (`type`) REFERENCES `account_type`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
