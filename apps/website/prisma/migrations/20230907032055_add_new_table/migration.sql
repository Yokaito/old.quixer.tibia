-- CreateTable
CREATE TABLE `type_news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `type_news_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `visible` BOOLEAN NOT NULL DEFAULT false,
    `content` TEXT NOT NULL,
    `account_id` INTEGER UNSIGNED NULL,
    `type_news_id` INTEGER NOT NULL DEFAULT 0,
    `updatedAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `createdAt` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `account_id`(`account_id`),
    INDEX `type_news_id`(`type_news_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `news` ADD CONSTRAINT `news_type_news_fk` FOREIGN KEY (`type_news_id`) REFERENCES `type_news`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
