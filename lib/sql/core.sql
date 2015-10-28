-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'scenarios'
-- 
-- ---

DROP TABLE IF EXISTS `scenarios`;
		
CREATE TABLE `scenarios` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `scenario_name` VARCHAR(255) NOT NULL,
  `steps` MEDIUMTEXT,
  `author` TINYINT NOT NULL,
  `automated` TINYINT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'users'
-- 
-- ---

DROP TABLE IF EXISTS `users`;
		
CREATE TABLE `users` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(16) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `scenarios` ADD FOREIGN KEY (author) REFERENCES `users` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `scenarios` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `scenarios` (`id`,`scenario_name`,`steps`,`author`,`automated`) VALUES
-- ('','','','','');
-- INSERT INTO `users` (`id`,`user_name`,`email`) VALUES
-- ('','','');
