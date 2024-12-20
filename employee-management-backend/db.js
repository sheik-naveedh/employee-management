// db.js
const mysql = require('mysql');

// Create a connection to the database
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);  // Exit the process if database connection fails
  }
  console.log('Database connected successfully');
});

// Create the employees table if it doesn't exist
const createTableQuery = `
CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  employeeID VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  phoneNumber VARCHAR(20),
  department VARCHAR(100),
  dateOfJoining DATE,
  role VARCHAR(100),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`;

db.query(createTableQuery, (err) => {
if (err) {
  console.error('Error creating employees table:', err);
}
});


module.exports = db; // Export the database connection for use in other files
