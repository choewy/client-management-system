'use strict';

const multer = require('multer');
const upload = multer({ dest: '../upload' });
const db = require('./app.database');

const appController = {
    getCustomers: {
        method: 'get',
        url: '/customers',
        middleware: null,
        callback: (req, res) => {
            const query = `SELECT * FROM customer WHERE isDeleted = 0`;
            db.query(query,
                (err, rows, fields) => {
                    if (err) {
                        return res.json({
                            ok: false,
                            message: err.sqlMessage
                        });
                    };
                    return res.json({
                        ok: true,
                        rows
                    });
                }
            );
        }
    },
    addNewCustomer: {
        method: 'post',
        url: '/customers',
        middleware: upload.single('image'),
        callback: (req, res) => {
            const image = req.file ? `/image/${req.file.filename}` : null;
            const { name, birthday, gender, job } = req.body;
            const createdAt = new Date();
            const deletedAt = null;
            const isDeleted = 0;
            const query = `INSERT INTO customer VALUES(null, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const params = [image, name, birthday, gender, job, createdAt, deletedAt, isDeleted];
            db.query(query,
                params,
                (error, rows, fields) => {
                    if (error) {
                        return res.json({
                            ok: false,
                            message: error.sqlMessage
                        });
                    };
                    return res.json({
                        ok: true,
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
                }
            );
        }
    },
    deleteCustomer: {
        method: 'delete',
        url: '/customers/:customer_id',
        callback: (req, res) => {
            const customer_id = Number(req.params.customer_id);
            const deletedAt = new Date();
            const isDeleted = 1;
            const query = `UPDATE customer SET deletedAt = ?, isDeleted = ? WHERE customer_id = ?`;
            db.query(query,
                [deletedAt, isDeleted, customer_id],
                (error, rows, fields) => {
                    if (error) {
                        return res.json({
                            ok: false,
                            message: error.sqlMessage
                        });
                    };
                    return res.json({
                        ok: true,
                        customer_id
                    });
                }
            );
        }
    }
};

module.exports = appController;