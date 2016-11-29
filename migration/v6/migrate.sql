ALTER TABLE Users add verificationEmailToken varchar(32) DEFAULT NULL;

ALTER TABLE Messages MODIFY COLUMN type enum('greeting','orderConfirm','paymentConfirm','deliveryConfirm','orderSync', 'forgotPassword', 'contact', 'newEmail');

ALTER TABLE Posts add `publish` tinyint(1) DEFAULT '1';
DROP TABLE Slogans;

CREATE TABLE `Quotes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `type` enum('quote','recommend') DEFAULT 'quote',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `img` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `img` (`img`),
  CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`img`) REFERENCES `Images` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


ALTER TABLE RecipeOrders MODIFY COLUMN productionStatus enum("NEW","PENDING", "RECEIVED", "REQUESTED", "SUBMITTED", "PAID", "PROCESSING", "CANCELLED", "SHIPPED", "DELIVERED", "COMPLETED");
ALTER TABLE EventOrders MODIFY COLUMN productionStatus enum("NEW","PENDING", "RECEIVED", "REQUESTED", "SUBMITTED", "PAID", "PROCESSING", "CANCELLED", "SHIPPED", "DELIVERED", "COMPLETED");
UPDATE RecipeOrders JOIN Allpays ON Allpays.`RecipeOrderId` = RecipeOrders.`id` SET RecipeOrders.`productionStatus` = "PENDING" WHERE Allpays.PaymentType = 'aio';

UPDATE Feeds SET publish = 0 WHERE type = 'status';
ALTER TABLE Feeds MODIFY fullPicture text;
