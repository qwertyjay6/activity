const multer = require('multer');
const cors = require("cors");
const express = require('express');
const mongoose = require('mongoose'); // Import Mongoose
const app = express();
const userRoute = require("./routes/userRoute");
const port = process.env.PORT || 4001;

// Middleware to parse JSON requests and handle CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB (replace with your own MongoDB connection string)
mongoose.connect("mongodb+srv://jlsarmiento1996:saki12345@wdc028-course-booking.9nbzgsx.mongodb.net/capstone", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Set up a callback for when the database connection is open
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Import your vehicleRoute 
const vehicleRoute  = require('./routes/vehicleRoute');

// Use the vehicleRoute  for specific routes
app.use('/', vehicleRoute);
app.use("/users", userRoute);
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
