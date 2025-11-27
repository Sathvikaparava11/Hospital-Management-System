const { pool } = require('../db');

const getDoctors = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT d.*, dep.name as department_name 
      FROM doctors d 
      LEFT JOIN departments dep ON d.department_id = dep.id 
      ORDER BY d.created_at DESC
    `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const createDoctor = async (req, res) => {
    const { name, specialization, contact, email, schedule, department_id } = req.body;
    const deptId = department_id === '' ? null : department_id;

    try {
        const result = await pool.query(
            'INSERT INTO doctors (name, specialization, contact, email, schedule, department_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [name, specialization, contact, email, schedule, deptId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getDoctors, createDoctor };
