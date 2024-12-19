const express = require("express");
const postgres = require("postgres");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const sql = postgres("postgresql://postgres:tiger@localhost:5432/rohit");

const EmployeeModel = {
    create: async ({ email, password }) => {
        // Store the password as plain text (not recommended)
        const result = await sql`INSERT INTO employees (email, password) VALUES (${email}, ${password}) RETURNING *`;
        return result[0];
    },
    findByEmail: async (email) => {
        const result = await sql`SELECT * FROM employees WHERE email = ${email}`;
        return result[0]; // Return the first matching employee
    }
};

app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const existingEmployee = await EmployeeModel.findByEmail(email);
        if (existingEmployee) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        const employee = await EmployeeModel.create({ email, password });
        res.status(201).json(employee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Failed to create employee', details: error.message });
    }
});

// New login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    try {
        const employee = await EmployeeModel.findByEmail(email);
        if (!employee) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored password (plain text)
        if (employee.password === password) {
            // Successful login
            res.status(200).json({ message: 'Login successful', employee });
        } else {
            // Invalid password
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Failed to log in', details: error.message });
    }
});

app.listen(3001, () => {
    console.log("Server is Running on port 3001");
});