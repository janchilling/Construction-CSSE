const express = require('express');
const app = express();
const  cors = require("cors");
require("dotenv").config();
const connectToDatabase = require('./config/database');

const port = process.env.PORT || 8070;

// Connect to the database
connectToDatabase(process.env.MONGODB_URL);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);

const employeesRouter = require('./routes/employeeRoutes');
app.use('/employees', employeesRouter);

const supplierRouter = require('./routes/supplierRoutes');
app.use('/suppliers', supplierRouter);


//Server Connection
app.listen(port, () => {
    console.log(`Server is up and running on port number ${port}`);
});
