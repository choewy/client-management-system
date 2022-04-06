'use strict';

const mysql = require('mysql');

const config = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const db = mysql.createConnection(config);
db.connect();

module.exports = db;
