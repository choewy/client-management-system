SET GLOBAL time_zone="Asia/Seoul";
SET time_zone="Asia/Seoul";

CREATE DATABASE IF NOT EXISTS service;
USE service;

CREATE TABLE IF NOT EXISTS customer (
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
	image VARCHAR(1024),
	name VARCHAR(64),
	birthday VARCHAR(64),
	gender VARCHAR(64),
	job VARCHAR(64),
	createdAt DATETIME,
	deletedAt DATETIME,
	isDeleted TINYINT(1)
) DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

INSERT INTO customer
SELECT
	NULL,
	"https://placeimg.com/64/64/1",
	"최원영",
	"1995-03-02",
	"남자",
	"개발자",
	NOW() ,
	NULL,
	0
FROM DUAL 
	WHERE (SELECT COUNT(*) FROM customer) < 2;

INSERT INTO customer
SELECT
	NULL,
	"https://placeimg.com/64/64/1",
	"아이유",
	"1992-03-02",
	"여자",
	"가수",
	NOW() ,
	NULL,
	0
FROM DUAL 
	WHERE (SELECT COUNT(*) FROM customer) < 2;