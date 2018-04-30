-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titleID` int(11) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `commTimeMs` double DEFAULT NULL,
  `commText` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,1521833562002,''),(2,7,1,1521833937947,'Кандидат Павел Грудинин, отказавшись участвовать в дебатах, доверил эту миссию своему представителю — Нине Останиной.'),(3,6,2,1521834881181,'Ведущий Владимир Соловьев предложил переименовать программу в «Совместные агитационные мероприятия».'),(4,8,2,1521921737916,'Нужно бы исправить размер этого поля'),(5,8,3,1521970906311,'Проверяем авторизацию по токену'),(6,5,3,1521971032064,'Проверяем авторизацию по токену'),(7,9,5,1523182299129,'Against the dark\na tall white fountain played'),(8,11,5,1523182398740,'When you are not performing your duties, do they keep you in a little box?'),(9,11,5,1523182543651,'What\'s it like to hold the hand of someone you love?'),(10,10,5,1523182757732,'Cells'),(11,10,5,1523182766034,'Interlinked'),(12,10,5,1523182781891,'Within cells interlinked'),(13,10,6,1523183125516,'123'),(14,10,6,1523183142779,'С детства за амд'),(15,12,7,1523183356868,'123');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `extraid`
--

DROP TABLE IF EXISTS `extraid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `extraid` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `titleID` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `extraid`
--

LOCK TABLES `extraid` WRITE;
/*!40000 ALTER TABLE `extraid` DISABLE KEYS */;
INSERT INTO `extraid` VALUES (1,'Main title',9);
/*!40000 ALTER TABLE `extraid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `authorID` int(11) DEFAULT NULL,
  `title` varchar(90) COLLATE utf8_unicode_ci DEFAULT NULL,
  `shortDesc` varchar(120) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fullDesc` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `thumbImage` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdTime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (5,1,'Ошибка в MACOS, IOS и WATCHOS позволяет рушить…','Краткое описание 1','macos.ejs','2.jpg','2018-03-23 18:53:31'),(6,1,'Смартфон XIAOMI MI MIX 2S засветился в первом видео','Краткое описание 2','xiaomi1.ejs','1.jpg','2018-03-23 18:53:31'),(7,2,'IOS 11.3: Была выпущена бета-версия для разработчиков и тестров','Краткое описание 3','ios113.ejs','ios-logo-icon-100733550.jpg','2018-03-23 18:53:31'),(8,1,'Зачем тебе уши, если ты не слушаешь Антона Другалева?','Краткое описание 4','master.ejs','V-sIxy4oW4g.jpg','2018-03-23 18:53:31'),(9,1,'ASRock X470 Fatal1ty Gaming ITX/AC Motherboard Photos','Various motherboard manufacturers are hard at work prepping their X470 chipset','x470.ejs','untitled-1.jpg','2018-04-04 23:19:58'),(10,4,'NVIDIA подверглась критике','Отсутствие конкуренции — верный путь к снижению требований к собственной продукции. Поэтому выпуск под названием…','mx150.ejs','image1.jpeg','2018-04-08 13:09:27'),(11,4,'Когда ждать «галактическую» десятку?!','Специалист уверен, что смартфон Samsung Galaxy X со сгибающимся дисплеем не выйдет в следующем году','gal10.ejs','image2.png','2018-04-08 13:09:53'),(12,4,'Выкусите, ФСБ и РКН','На этой неделе было объявлено о том, что база активных ежемесячных пользователей Telegram составляет 200 млн человек','rkn.ejs','image3.jpeg','2018-04-08 13:10:11'),(13,4,'5G-будущее наступит через три года','По мнению Strategy Analytics, смартфоны 5G начнут набирать популярность лишь в 2021 году','5gf.ejs','image4.jpeg','2018-04-11 22:14:03');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(90) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
INSERT INTO `subscribers` VALUES (1,'umbraanima@yandex.ru'),(2,'cajy@rambler.ru');
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` char(60) CHARACTER SET ascii COLLATE ascii_bin DEFAULT NULL,
  `created` double DEFAULT NULL,
  `loggedIn` double DEFAULT NULL,
  `userPic` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `accLevel` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Anton Drugalev','$2a$09$YNinB4FEwVBAlDmKPlqlfuBsCuspZxXHBYEIq4iGxsua2SncTZlva',1521820411813,1522873114055,NULL,2),(2,'Николай Закоморный','$2a$09$m4IP198rAA1pMlXmxnTLXuJDpfV4aJ8njnmENfcBW1unObdsCpJ1C',1521820411814,1522869173460,'u2.jpg',0),(3,'Great Master','$2a$09$fqcU1qfUdmilYis.0HWlkeBV4H4tmypJaAfq8MR8zEFb53aWUIF1S',1521970860429,1521970860429,NULL,0),(4,'Григорий Зотенко','$2a$09$IbnsI4eTG4NbSc2tNzjMLOGGr6BBrJJfhmJlTtEKCKJnPRBzrw5qu',1523181595846,1523563368602,'u4.jpeg',2),(5,'Andrew Barlit','$2a$09$Dz56rm0yqEszG6T4Q5ggTuOQkBVf4nERAC8WuUnADL64DxbJj6PXW',1523182262408,1523182738463,'u5.jpg',0),(6,'WalterWhite','$2a$09$hRxUpN6C0AtvTWpywvMM4.q2d1iW9LU38m7.d2cfR0ZSLugwMclN2',1523183119212,1523183413677,'u6.jpg',0),(7,'123','$2a$09$0XoKY9GrdwH15KpY.ca6lOSPZoMGyOMKeaw4P17Zh/MlbLvzDp33S',1523183353744,1523183438186,'u7.jpg',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'mydb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-20 23:37:03
