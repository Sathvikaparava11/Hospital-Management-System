const { pool } = require('../db');

// Departments
const getDepartments = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT d.*, doc.name as head_doctor_name 
      FROM departments d 
      LEFT JOIN doctors doc ON d.head_doctor_id = doc.id 
      ORDER BY d.name
    `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const createDepartment = async (req, res) => {
    const { name, head_doctor_id } = req.body;
    const headDocId = head_doctor_id === '' ? null : head_doctor_id;

    try {
        const result = await pool.query(
            'INSERT INTO departments (name, head_doctor_id) VALUES ($1, $2) RETURNING *',
            [name, headDocId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

// Rooms
const getRooms = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT r.*, d.name as department_name 
      FROM rooms r 
      LEFT JOIN departments d ON r.department_id = d.id 
      ORDER BY r.number
    `);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const createRoom = async (req, res) => {
    const { number, type, status, department_id } = req.body;
    const deptId = department_id === '' ? null : department_id;

    try {
        const result = await pool.query(
            'INSERT INTO rooms (number, type, status, department_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [number, type, status, deptId]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getDepartments, createDepartment, getRooms, createRoom };
