const express = require('express');
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { validateBooking } = require('../middleware/validation');

const router = express.Router();
router.use(protect);
router.route('/').post(validateBooking, createBooking).get(getUserBookings);

module.exports = router;
