require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee');
const db = require('./db'); // Import the db connection

const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/employees', employeeRoutes);

app.get('/api/employees', (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching employees' });
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});