const Employee = require('../models/employee');
const Supplier = require('../models/supplier');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Registering a new employee
const registerEmployee = async (req, res) => {
    try {
        const { Fullname, EmployeeID, Email, Address, Phone, UserType, Gender, Password } = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);

        const employee = new Employee({
            Fullname, 
            EmployeeID, 
            Email, 
            Address, 
            Phone, 
            UserType, 
            Gender,
            Password: hashedPassword,
        });

        await employee.save();

        res.json({ message: 'Employee registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Employee registration failed' });
    }
};

//Employee Login
const loginEmployee = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const employee = await Employee.findOne({ Email });

        if (!employee) {
            res.status(401).json({ error: 'Employee authentication failed' });
            return;
        }

        const passwordMatch = await bcrypt.compare(Password, employee.Password);

        if (passwordMatch) {
            const token = jwt.sign({ email: employee.Email }, 'secret_key');
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Employee authentication failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Employee authentication failed' });
    }
};

//Supplier Registration
const registerSupplier = async (req, res) => {
    try {
        const { SupplierName, SupplierID, SupplierEmail, SupplierAddress, SupplierPhone, Password } = req.body;
        const hashedPassword = await bcrypt.hash(Password, 10);

        const supplier = new Supplier({
            SupplierName, 
            SupplierID, 
            SupplierEmail, 
            SupplierAddress, 
            SupplierPhone,
            Password: hashedPassword,
        });

        await supplier.save();

        res.json({ message: 'Supplier registration successful' });
    } catch (error) {
        res.status(500).json({ error: 'Supplier registration failed' });
    }
};

//Supplier Login
const loginSupplier = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const supplier = await Supplier.findOne({ Email });

        if (!supplier) {
            res.status(401).json({ error: 'Supplier authentication failed' });
            return;
        }

        const passwordMatch = await bcrypt.compare(Password, supplier.Password);

        if (passwordMatch) {
            const token = jwt.sign({ email: supplier.Email }, 'secret_key');
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Supplier authentication failed' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Supplier authentication failed' });
    }
};


module.exports = { 
    registerEmployee, 
    loginEmployee,
    registerSupplier,
    loginSupplier
};
