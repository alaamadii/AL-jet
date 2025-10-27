const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());            // Allow connections from the frontend
app.use(express.json());    // Parse JSON data

// Route mounting
app.use('/api/v1/auth', authRoutes);        // All authentication routes start with /api/v1/auth
app.use('/api/v1/bookings', bookingRoutes); // All booking routes start with /api/v1/bookings

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
