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
    const query = `SELECT * FROM customer WHERE isDeleted = 0`;
    connection.query(query, (error, rows, fields) => {
        if (error) {
            return res.json({
                success: false,
                message: error.sqlMessage
            });
        };
        return res.json({
            success: true,
            rows
        });
    });
});

app.post('/api/customers', upload.single('image'), (req, res) => {
    const image = req.file ? `/image/${req.file.filename}` : null;
    const { name, birthday, gender, job } = req.body;
    const createdAt = new Date();
    const deletedAt = null;
    const isDeleted = 0;
    const query = `INSERT INTO customer VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [image, name, birthday, gender, job, createdAt, deletedAt, isDeleted];
    connection.query(query, params, (error, rows, fields) => {
        if (error) {
            return res.json({
                success: false,
                message: error.sqlMessage
            });
        };
        return res.json({
            success: true,
            row: {
                customer_id: rows.insertId,
                image,
                name,
                birthday,
                gender,
                job,
                createdAt,
                deletedAt,
                isDeleted
            }
        });
    });
});

app.delete('/api/customers/:customer_id', (req, res) => {
    const customer_id = Number(req.params.customer_id);
    const deletedAt = new Date();
    const isDeleted = 1;
    const query = `UPDATE customer SET deletedAt = ?, isDeleted = ? WHERE customer_id = ?`;
    connection.query(query, [deletedAt, isDeleted, customer_id], (error, rows, fields) => {
        if (error) {
            return res.json({
                success: false,
                message: error.sqlMessage
            });
        };
        return res.json({ success: true });
    })
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});