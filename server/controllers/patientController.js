const { pool } = require('../db');

const getPatients = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM patients ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const createPatient = async (req, res) => {
    const { name, age, gender, contact, address, medical_history } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO patients (name, age, gender, contact, address, medical_history) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, age, gender, contact, address, medical_history]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getPatients, createPatient };
