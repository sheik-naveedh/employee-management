// routes/employee.js
const express = require('express');
const db = require('../db'); 
const router = express.Router();

router.post('/add-employee', (req, res) => {
  const { name, employeeID, email, phoneNumber, department, dateOfJoining, role } = req.body;

  const checkQuery = `SELECT * FROM employees WHERE employeeID = ? OR email = ?`;
  db.query(checkQuery, [employeeID, email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error checking employee data' });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: 'Employee ID or Email already exists' });
    }

    const insertQuery = `INSERT INTO employees (name, employeeID, email, phoneNumber, department, dateOfJoining, role)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(insertQuery, [name, employeeID, email, phoneNumber, department, dateOfJoining, role], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error inserting employee data' });
      }
      return res.status(200).json({ message: 'Employee added successfully' });
    });
  });
});


module.exports = router;
