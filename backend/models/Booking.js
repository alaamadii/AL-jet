const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  departure: { type: String, required: true, trim: true, maxlength: 80 },
  arrival: { type: String, required: true, trim: true, maxlength: 80 },
  passengers: { type: Number, required: true, min: 1, max: 18 },
  departureDate: { type: Date, required: true },
  departureTime: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
  jetType: { type: String, required: true, trim: true, maxlength: 80 },
  status: { type: String, enum: ['requested', 'confirmed', 'cancelled'], default: 'requested' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
