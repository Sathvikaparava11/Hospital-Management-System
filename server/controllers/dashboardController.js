const { pool } = require('../db');

const getDashboardStats = async (req, res) => {
    try {
        const patientsCount = await pool.query('SELECT COUNT(*) FROM patients');
        const doctorsCount = await pool.query('SELECT COUNT(*) FROM doctors');
        const staffCount = await pool.query('SELECT COUNT(*) FROM staff');
        const availableRoomsCount = await pool.query("SELECT COUNT(*) FROM rooms WHERE status = 'Available'");

        const departmentStats = await pool.query(`
            SELECT d.name, COUNT(doc.id) as count 
            FROM departments d 
            LEFT JOIN doctors doc ON d.id = doc.department_id 
            GROUP BY d.id, d.name
        `);

        res.json({
            patients: parseInt(patientsCount.rows[0].count),
            doctors: parseInt(doctorsCount.rows[0].count),
            staff: parseInt(staffCount.rows[0].count),
            availableRooms: parseInt(availableRoomsCount.rows[0].count),
            departments: departmentStats.rows,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getDashboardStats };
