require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

const mysql = require('mysql');
const config = {
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
};

const connection = mysql.createConnection(config);
connection.connect();

app.get('/api/customers', (req, res) => {
    const query = `SELECT * FROM customer`;
    connection.query(query, (err, rows, fields) => {
        return res.json({
            success: true,
            rows
        });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});