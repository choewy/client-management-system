require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static('../upload'));
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

const multer = require('multer');
const upload = multer({ dest: '../upload' });

app.get('/api/customers', (req, res) => {
    const query = `SELECT * FROM customer`;
    connection.query(query, (err, rows, fields) => {
        return res.json({
            success: true,
            rows
        });
    });
});

app.post('/api/customers', upload.single('image'), (req, res) => {
    const image = req.file ? `/image/${req.file.filename}` : null;
    const { name, birthday, gender, job } = req.body;
    const query = `INSERT INTO customer VALUES(null, ?, ?, ?, ?, ?)`;
    const params = [image, name, birthday, gender, job];
    connection.query(query, params, (err, rows, fields) => {
        return res.json({
            success: true,
            row: {
                customer_id: rows.insertId,
                image,
                name,
                birthday,
                gender,
                job
            }
        });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});