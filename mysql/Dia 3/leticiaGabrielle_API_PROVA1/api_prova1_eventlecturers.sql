CREATE DATABASE  IF NOT EXISTS `api_prova1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `api_prova1`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: api_prova1
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `eventlecturers`
--

DROP TABLE IF EXISTS `eventlecturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventlecturers` (
  `id` varchar(60) NOT NULL,
  `event_id` varchar(60) NOT NULL,
  `lecturer_id` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `lecturer_id` (`lecturer_id`),
  CONSTRAINT `eventlecturers_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  CONSTRAINT `eventlecturers_ibfk_2` FOREIGN KEY (`lecturer_id`) REFERENCES `lecturers` (`lecturer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventlecturers`
--

LOCK TABLES `eventlecturers` WRITE;
/*!40000 ALTER TABLE `eventlecturers` DISABLE KEYS */;
INSERT INTO `eventlecturers` VALUES ('42de1ab2-f43c-422b-b0f3-cebb31a6c0df','ca70572a-ce76-41b7-8eb7-2699e470735a','245ffb86-c6f1-4be3-9c1a-7fe31c001017'),('af991cd2-445c-46c1-b0a1-36a9661f4ae8','25890b82-f4f5-473c-bdc2-7063ed01d34c','245ffb86-c6f1-4be3-9c1a-7fe31c001017'),('eb4cd99d-da89-455c-ad09-8b68b9a61275','c6b75378-9699-42da-af20-1400445f7199','245ffb86-c6f1-4be3-9c1a-7fe31c001017'),('ff10515e-aafc-4e83-9d2c-5607f756808f','307f4fdd-b964-4e21-9614-4eb0e43f2eed','245ffb86-c6f1-4be3-9c1a-7fe31c001017');
/*!40000 ALTER TABLE `eventlecturers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-16 10:16:58
