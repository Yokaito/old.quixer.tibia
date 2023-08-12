-- AddForeignKey
ALTER TABLE `players_online` ADD CONSTRAINT `players_online_players_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
