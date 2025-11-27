const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { initDb } = require('./db');

const dashboardRoutes = require('./routes/dashboard');
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const staffRoutes = require('./routes/staff');
const infrastructureRoutes = require('./routes/infrastructure');

app.use('/api/dashboard', dashboardRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/infrastructure', infrastructureRoutes);

app.listen(PORT, async () => {
  await initDb();
  console.log(`Server is running on port ${PORT}`);
});
