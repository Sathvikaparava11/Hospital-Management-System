const { pool } = require('../db');

const getStaff = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT s.*, dep.name as department_name 
      FROM staff s 
      LEFT JOIN departments dep ON s.department_id = dep.id 
      ORDER BY s.created_at DESC
    `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const createStaff = async (req, res) => {
    const { name, role, contact, email, department_id } = req.body;
    const deptId = department_id === '' ? null : department_id;

    try {
        const result = await pool.query(
            'INSERT INTO staff (name, role, contact, email, department_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, role, contact, email, deptId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getStaff, createStaff };
