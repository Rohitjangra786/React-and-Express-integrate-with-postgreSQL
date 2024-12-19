const { Pool } = require('pg');

const connectionString = 'postgresql://localhost:5432/rohit';
const username = 'postgres';
const password = 'tiger';

const pool = new Pool({
    connectionString,
    user: username,
    password,
});

const EmployeeModel = {
    async createEmployee(email, password) {
        const result = await pool.query('INSERT INTO Employee (email, password) VALUES ($1, $2) RETURNING *', [email, password]);
        return result.rows[0];
    },
    async getEmployees() {
        const result = await pool.query('SELECT * FROM Employee');
        return result.rows;
    },
    // Add more methods as needed
};

module.exports = EmployeeModel;