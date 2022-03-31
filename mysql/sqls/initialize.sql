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
	job VARCHAR(64)
) DEFAULT CHARACTER SET UTF8 COLLATE utf8_general_ci;

INSERT INTO customer(image, name, birthday, gender, job)
SELECT
	"https://placeimg.com/64/64/1",
	"최원영",
	"1995-03-02",
	"남자",
	"개발자"
FROM DUAL 
	WHERE (SELECT COUNT(*) FROM customer) < 3;

INSERT INTO customer(image, name, birthday, gender, job)
SELECT
	"https://placeimg.com/64/64/1",
	"박길현",
	"1980-03-02",
	"남자",
	"백수"
FROM DUAL 
	WHERE (SELECT COUNT(*) FROM customer) < 3;

INSERT INTO customer(image, name, birthday, gender, job)
SELECT
	"https://placeimg.com/64/64/1",
	"홍상수",
	"2000-03-02",
	"여자",
	"공무원"
FROM DUAL 
	WHERE (SELECT COUNT(*) FROM customer) < 3;