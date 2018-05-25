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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,1521833562002,''),(2,7,1,1521833937947,'Кандидат Павел Грудинин, отказавшись участвовать в дебатах, доверил эту миссию своему представителю — Нине Останиной.'),(3,6,2,1521834881181,'Ведущий Владимир Соловьев предложил переименовать программу в «Совместные агитационные мероприятия».'),(4,8,2,1521921737916,'Нужно бы исправить размер этого поля'),(5,8,3,1521970906311,'Проверяем авторизацию по токену'),(6,5,3,1521971032064,'Проверяем авторизацию по токену'),(7,9,5,1523182299129,'Against the dark\na tall white fountain played'),(8,11,5,1523182398740,'When you are not performing your duties, do they keep you in a little box?'),(9,11,5,1523182543651,'What\'s it like to hold the hand of someone you love?'),(10,10,5,1523182757732,'Cells'),(11,10,5,1523182766034,'Interlinked'),(12,10,5,1523182781891,'Within cells interlinked'),(13,10,6,1523183125516,'123'),(14,10,6,1523183142779,'С детства за амд'),(15,12,7,1523183356868,'123'),(16,18,4,1527274433655,'Поразительно технологичное устройство, обязательно купил бы себе такой, будь такая возможность...'),(17,21,5,1527275641665,'Бессмысленная трата ресурсов, и ещё теперь не работают некоторые другие сайты и сервисы'),(18,22,5,1527275720623,'Помнится наш админ тоже такой телефон вернул'),(19,23,8,1527276775670,'10 из 10, настоящая редкость. Божественное приключение.');
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
-- Table structure for table `loyces`
--

DROP TABLE IF EXISTS `loyces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loyces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `loyce` tinyint(2) NOT NULL,
  `titleID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `titleID_idx` (`titleID`),
  KEY `userID_idx` (`userID`),
  CONSTRAINT `titleID` FOREIGN KEY (`titleID`) REFERENCES `news` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loyces`
--

LOCK TABLES `loyces` WRITE;
/*!40000 ALTER TABLE `loyces` DISABLE KEYS */;
INSERT INTO `loyces` VALUES (1,1,11,5),(2,1,12,5),(3,1,11,4),(4,1,13,4),(5,1,10,5),(6,1,14,4),(7,1,19,4),(8,1,18,5);
/*!40000 ALTER TABLE `loyces` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (5,1,'Ошибка в MACOS, IOS и WATCHOS позволяет рушить…','Краткое описание 1','macos.ejs','2.jpg','2018-03-23 18:53:31'),(6,1,'Смартфон XIAOMI MI MIX 2S засветился в первом видео','Краткое описание 2','xiaomi1.ejs','1.jpg','2018-03-23 18:53:31'),(7,2,'IOS 11.3: Была выпущена бета-версия для разработчиков и тестров','Краткое описание 3','ios113.ejs','ios-logo-icon-100733550.jpg','2018-03-23 18:53:31'),(8,1,'Зачем тебе уши, если ты не слушаешь Антона Другалева?','Краткое описание 4','master.ejs','V-sIxy4oW4g.jpg','2018-03-23 18:53:31'),(9,1,'ASRock X470 Fatal1ty Gaming ITX/AC Motherboard Photos','Various motherboard manufacturers are hard at work prepping their X470 chipset','x470.ejs','untitled-1.jpg','2018-04-04 23:19:58'),(10,4,'NVIDIA подверглась критике','Отсутствие конкуренции — верный путь к снижению требований к собственной продукции. Поэтому выпуск под названием…','mx150.ejs','image1.jpeg','2018-04-08 13:09:27'),(11,4,'Когда ждать «галактическую» десятку?!','Специалист уверен, что смартфон Samsung Galaxy X со сгибающимся дисплеем не выйдет в следующем году','gal10.ejs','image2.png','2018-04-08 13:09:53'),(12,4,'Выкусите, ФСБ и РКН','На этой неделе было объявлено о том, что база активных ежемесячных пользователей Telegram составляет 200 млн человек','rkn.ejs','image3.jpeg','2018-04-08 13:10:11'),(13,4,'5G-будущее наступит через три года','По мнению Strategy Analytics, смартфоны 5G начнут набирать популярность лишь в 2021 году','5gf.ejs','image4.jpeg','2018-04-11 22:14:03'),(14,4,'Процессоры AMD и Intel почти одинаково популярны среди энтузиастов','LinusTechTips, один из немногих каналов-миллионников о компьютерной технике на YouTube, поделился статистикой продаж','intelamd.ejs','103-1.jpg','2018-05-25 21:13:12'),(17,4,'Самые ожидаемые игры E3 2018: Battlefield 5, Death Stranding, Metro Exodus и многие другие','Electronic Entertainment Expo (E3) – одно из самых значимых событий игровой индустрии.','e3_2018.ejs','2.jpg','2018-05-25 21:38:07'),(18,4,'Как превратить ультрабук в игровую систему: обзор GIGABYTE RX 580 Gaming Box','GIGABYTE RX 580 Gaming Box — один из многих вариантов нового поколения таких боксов, задача которых — заметно увеличить','GBgamingbox.ejs','3.jpg','2018-05-25 21:52:53'),(19,4,'Что такое Root-права и почему они нужны всем?','Любой пользователь, интересующийся android-устройствами, не раз слышал такие термины, как Root-права ','rootprava.ejs','root.jpg','2018-05-25 22:00:09'),(20,4,'Hyundai представляет серию SMART-телевизоров','Компания Hyundai представляет LED-телевизор серии 503 - H-LED32R503GT2S с диагональю экрана в 32 дюйма.','hyundai.ejs','Hyundai-SMART.jpg','2018-05-25 22:05:42'),(21,4,'Роскомнадзор считает, что Telegram из-за блокировок потерял 25% российских пользователей','Сейчас в России мессенджер работает с перебоями у 15-40% пользователей','RKN_telegram.ejs','4703983_large.jpg','2018-05-25 22:10:10'),(22,4,'Apple прекрасно знала, что смартфоны iPhone 6 будут легко сгибаться','В Сети появились доказательства того, что Apple прекрасно знала, что смартфон iPhone 6 будет легко сгибаться','iphone6.ejs','maxresdefault_large.png','2018-05-25 22:13:40'),(23,4,'Продано более 5 млн. копий God of War','За первый месяц с момента релиза God of War продано более 5 млн. копий.','GoWselling.ejs','gow_scr.jpg','2018-05-25 22:19:52'),(24,4,'Apple не разрешила Valve выпустить на iOS приложение Steam Link','Недавно компания Valve анонсировала приложение Steam Link, которое позволяет пользователям транслировать игры из Steam','steamlink.ejs','Steam Linkappios_base.jpg','2018-05-25 22:21:57'),(25,4,'GeForce GTS 450 на частотах 1200/4800 МГц возвращает престиж российским оверклокерам','Описанную нашим соотечественником с псевдонимом Traktor победу в категории GeForce GTX 460 некоторые критики восприняли ','gts450_OC.ejs','12_02.jpg','2018-05-25 22:24:55'),(26,4,'Графическая память Micron активно используется в автомобилях','Компания Micron Technology в этом году решила поразить своих инвесторов и акционеров гигантизмом, а потому её профильное','micron.ejs','pegasus_01.jpg','2018-05-25 22:27:44');
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
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` char(60) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `created` double NOT NULL,
  `loggedIn` double NOT NULL,
  `userPic` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `accLevel` tinyint(4) DEFAULT '0',
  `phoneNum` varchar(12) COLLATE utf8_unicode_ci DEFAULT NULL,
  `realName` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `patronymic` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gender` tinyint(2) DEFAULT NULL,
  `age` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Anton Drugalev','$2a$09$YNinB4FEwVBAlDmKPlqlfuBsCuspZxXHBYEIq4iGxsua2SncTZlva',1521820411813,1527262754971,NULL,2,NULL,NULL,NULL,NULL,NULL),(2,'Николай Закоморный','$2a$09$m4IP198rAA1pMlXmxnTLXuJDpfV4aJ8njnmENfcBW1unObdsCpJ1C',1521820411814,1522869173460,'u2.jpg',0,NULL,NULL,NULL,NULL,NULL),(3,'Great Master','$2a$09$fqcU1qfUdmilYis.0HWlkeBV4H4tmypJaAfq8MR8zEFb53aWUIF1S',1521970860429,1521970860429,NULL,0,NULL,NULL,NULL,NULL,NULL),(4,'Григорий Зотенко','$2a$09$IbnsI4eTG4NbSc2tNzjMLOGGr6BBrJJfhmJlTtEKCKJnPRBzrw5qu',1523181595846,1527275705653,'u4.jpeg',2,NULL,NULL,NULL,NULL,NULL),(5,'Andrew Barlit','$2a$09$Dz56rm0yqEszG6T4Q5ggTuOQkBVf4nERAC8WuUnADL64DxbJj6PXW',1523182262408,1527279966619,'u5.jpg',0,NULL,NULL,NULL,NULL,NULL),(6,'WalterWhite','$2a$09$hRxUpN6C0AtvTWpywvMM4.q2d1iW9LU38m7.d2cfR0ZSLugwMclN2',1523183119212,1523183413677,'u6.jpg',0,NULL,NULL,NULL,NULL,NULL),(7,'123','$2a$09$0XoKY9GrdwH15KpY.ca6lOSPZoMGyOMKeaw4P17Zh/MlbLvzDp33S',1523183353744,1523183438186,'u7.jpg',0,NULL,NULL,NULL,NULL,NULL),(8,'Сандара Пак','$2a$09$f0LfmjC16e1PYD..xsNVcOafc0JGoxhCDmaerEsa9Oob90hX.5oPS',1527276538842,1527276690003,'u8.jpg',0,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'mydb'
--

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

-- Dump completed on 2018-05-25 23:29:57
