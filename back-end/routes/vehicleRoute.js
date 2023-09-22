const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Define the route to handle form submissions
router.post('/api/vehicles', vehicleController.createVehicle);

module.exports = router;
