const express = require('express');
const {
    Pool
} = require('pg');
const path = require('path');
const app = express();

app.use(express.static('public'));

require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
});


app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM raudhatul_table1');
        const rows = result.rows;

        const dataMap = {};
        rows.forEach(row => {
            dataMap[row.id] = row.value;
        });

        const table2 = {
            alpha: dataMap["A5"] + dataMap["A20"],
            beta: Math.floor(dataMap["A15"] / dataMap["A7"]),
            charlie: dataMap["A13"] * dataMap["A12"]
        };

        res.json({
            table1: rows,
            table2
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Database error");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});