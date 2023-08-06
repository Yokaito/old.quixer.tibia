-- Add trigger to table players

CREATE TRIGGER `ondelete_players` BEFORE DELETE ON `players`
 FOR EACH ROW BEGIN
        UPDATE `houses` SET `owner` = 0 WHERE `owner` = OLD.`id`;
END
