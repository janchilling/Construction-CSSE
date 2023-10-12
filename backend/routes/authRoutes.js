const express = require('express');
const router = express.Router();
const { 
    registerEmployee,
    loginEmployee,
    registerSupplier,
    loginSupplier 
} = require('../controllers/authController');

//Employee authentication
router.post('/registerEmployee', registerEmployee);
router.post('/loginEmployee', loginEmployee);

//Supplier authentication
router.post('/registerSupplier', registerSupplier);
router.post('/loginSupplier', loginSupplier);

module.exports = router;
