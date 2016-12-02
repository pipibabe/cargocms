ALTER TABLE `Images` ADD `hash` VARCHAR(32) NOT NULL AFTER `id`;
ALTER TABLE `Images` ADD `fileName` VARCHAR(128) NOT NULL AFTER `filePath`;
ALTER TABLE `Images` ADD `accessPath` VARCHAR(128) NOT NULL AFTER `hash`;
ALTER TABLE `Images` ADD `title` VARCHAR(64) NOT NULL AFTER `storage`, ADD `description` VARCHAR(255) NOT NULL AFTER `title`, ADD `memo` VARCHAR(255) NOT NULL AFTER `description`;

UPDATE `Images` SET `accessPath` = REPLACE(filePath,'file:///home/ubuntu/cargocms/.tmp/public/uploads/','') WHERE `filePath` LIKE 'file:///home/ubuntu/cargocms/.tmp/public/uploads/%'
UPDATE `Images` SET `fileName` = REPLACE(filePath,'file:///home/ubuntu/cargocms/.tmp/public/uploads/','') WHERE `filePath` LIKE 'file:///home/ubuntu/cargocms/.tmp/public/uploads/%'
