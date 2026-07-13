const Booking = require('../models/Booking');

exports.createBooking = async (request, response) => {
  try {
    const booking = await Booking.create({ ...request.body, user: request.user.id });
    response.status(201).json({ message: 'Booking request created.', booking });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: 'Unable to create the booking request.' });
  }
};

exports.getUserBookings = async (request, response) => {
  try {
    const bookings = await Booking.find({ user: request.user.id }).sort({ createdAt: -1 });
    response.json({ bookings });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: 'Unable to load booking requests.' });
  }
};
