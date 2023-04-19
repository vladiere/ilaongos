CREATE DATABASE 'carwashboy';

use carwashboy;

CREATE TABLE `tbl_branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `branch_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_publish` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `branch_status` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`branch_id`)
) ;

LOCK TABLES `tbl_branch` WRITE;

INSERT INTO `tbl_branch` VALUES (6,74,'bagbag gabo','2023-04-17 17:30:07','0'),(7,74,'baboyan road','2023-04-19 14:06:41','0');

UNLOCK TABLES;

CREATE TABLE `tbl_carwashshop` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `shop_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_publish` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `rating` decimal(3,2) NOT NULL DEFAULT '0.00',
  `number_rate` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
);

LOCK TABLES `tbl_carwashshop` WRITE;

INSERT INTO `tbl_carwashshop` VALUES (14,74,'qwerty carwash','ambot unsa ni','2023-04-17 17:32:57','2023-04-17 17:32:57',0,5.00,1);

UNLOCK TABLES;

CREATE TABLE `tbl_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trans_id` int NOT NULL,
  `comment` text NOT NULL,
  `date_commented` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ;

LOCK TABLES `tbl_comments` WRITE;

INSERT INTO `tbl_comments` VALUES (1,38,'nindot mo limpyo ug ilong','2023-04-18 06:59:14');

UNLOCK TABLES;

CREATE TABLE `tbl_documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `img_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_publish` date NOT NULL,
  `date_updated` date NOT NULL,
  PRIMARY KEY (`id`)
);

LOCK TABLES `tbl_documents` WRITE;

INSERT INTO `tbl_documents` VALUES (63,74,'user_data/0bdo.jpg','2023-04-17','2023-04-17'),(64,74,'user_data/1bpi-bank.jpg','2023-04-17','2023-04-17'),(65,74,'user_data/2china-bank.jpg','2023-04-17','2023-04-17');

UNLOCK TABLES;

CREATE TABLE `tbl_pending` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `shop_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ;

LOCK TABLES `tbl_pending` WRITE;

INSERT INTO `tbl_pending` VALUES (27,74,'qwerty carwash','ambot unsa ni','2023-04-17 17:29:28','2023-04-17 17:32:57',1);

UNLOCK TABLES;

CREATE TABLE `tbl_pricelist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `price` bigint NOT NULL,
  `wash_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vehicle_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` date NOT NULL,
  `date_updated` date NOT NULL,
  PRIMARY KEY (`id`)
) ;

LOCK TABLES `tbl_pricelist` WRITE;

INSERT INTO `tbl_pricelist` VALUES (14,72,1900,'body wash','hb','2023-04-17','2023-04-17'),(15,74,1234,'body wash','sedan','2023-04-17','2023-04-17'),(16,74,1222,'value wash','auv','2023-04-17','2023-04-17');

UNLOCK TABLES;

CREATE TABLE `tbl_profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `profile_path` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_added` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_updated` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ;

LOCK TABLES `tbl_profile` WRITE;

INSERT INTO `tbl_profile` VALUES (17,74,'user_data/admin-objective.jpg','2023-04-17 17:29:31','2023-04-17 17:29:31');

UNLOCK TABLES;


CREATE TABLE `tbl_staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `shop_assign` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `staff_firstname` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `staff_middlename` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `staff_lastname` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_of_birth` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contact_number` varchar(35) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `position` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `staff_status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`staff_id`)
) ;

LOCK TABLES `tbl_staff` WRITE;

INSERT INTO `tbl_staff` VALUES (8,74,'0','qweqwe','qweqwe','qweqwe','1111-01-01','qweqweqwe@qwe.qwe','09900909099','cleaner','0'),(9,74,'0','asd','asd','asd','1212-02-12','asd@email.asd','12312312312','cleaner','0');

UNLOCK TABLES;

CREATE TABLE `tbl_transactions` (
  `trans_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `shopowner_id` int NOT NULL,
  `carwash_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `vehicle_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `wash_type` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` bigint NOT NULL,
  `date_added` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_sched` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_updated` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `trans_status` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `stars` int NOT NULL DEFAULT '0',
  `staff_id` int DEFAULT NULL,
  PRIMARY KEY (`trans_id`)
) ;

LOCK TABLES `tbl_transactions` WRITE;

INSERT INTO `tbl_transactions` VALUES (38,75,74,'qwerty carwash','auv','value wash ',1222,'2023-04-17 17:52:38','2023-04-18 11:11 AM','2023-04-18 00:59:14','completed',5,8),(39,75,74,'qwert bagbag carwash','auv','value wash ',1222,'2023-04-17 18:29:46','2023-04-20 10:22 AM','2023-04-17 19:43:22','completed',0,8),(40,75,74,'qwerty carwash','sedan','body wash ',1234,'2023-04-17 18:31:05','2023-04-20 12:22 PM','2023-04-17 18:57:03','completed',0,NULL),(41,75,74,'qwerty carwash','sedan','body wash ',1234,'2023-04-17 18:43:11','2023-04-19 12:22 PM','2023-04-17 18:56:45','completed',0,NULL),(42,75,74,'qwert bagbag carwash','auv','value wash ',1222,'2023-04-17 19:31:43','2023-04-19 1:33 PM','2023-04-17 19:43:34','completed',0,9),(43,75,74,'qwerty carwash','sedan','body wash ',1234,'2023-04-17 19:53:45','2023-04-19 12:02 PM','2023-04-17 19:54:02','completed',0,8),(44,75,74,'qwerty carwash','auv','value wash ',1222,'2023-04-19 13:54:09','2023-04-20 11:33 PM','2023-04-19 13:56:07','completed',0,8);

UNLOCK TABLES;


CREATE TABLE `tbl_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email_add` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `lastname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `midname` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contact_no` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0000-000-0000',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'to be edited',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_add` (`email_add`)
) ;

LOCK TABLES `tbl_users` WRITE;

INSERT INTO `tbl_users` VALUES (1,'ongos@aim.com','1b52b140b334c130fc83b623c4d858bf','john carlo','ongos','bonjoir','admin','0987654321','bangbang, cordova, cebu','2023-02-07 00:00:00','2023-02-08 11:04:30',0),(74,'qwe@qwe.qwe','b26986ceee60f744534aaab928cc12df','qwe','qwe','qwe','owner','0000-000-0000','to be edited','2023-04-17 23:20:49','2023-04-17 17:29:31',0),(75,'asd@asd.asd','a3dcb4d229de6fde0db5686dee47145d','asd','asd','asd','customer','0000-000-0000','to be edited','2023-04-17 23:32:33','2023-04-17 23:32:33',0);

UNLOCK TABLES;
