const { Vehicle } = require('../models/models'); // Replace with your actual model

// Controller function to handle form submission
const createVehicle = async (req, res) => {
  try {
    // Create a new document with the submitted form data
    const { make, model, badge, logbook } = req.body;
    const newVehicle = new Vehicle({ make, model, badge, logbook });

    // Save the vehicle to the database
    await newVehicle.save();

    // Respond with a success message
    res.status(201).json({ message: 'Vehicle submitted successfully' });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).json({ error: 'An error occurred while submitting the vehicle' });
  }
};

module.exports = {
  createVehicle,
};
