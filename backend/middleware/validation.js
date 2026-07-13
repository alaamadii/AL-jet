exports.validateBooking = (request, response, next) => {
  const { departure, arrival, passengers, departureDate, departureTime, jetType } = request.body;
  const passengerCount = Number(passengers);
  const date = new Date(`${departureDate}T${departureTime || '00:00'}`);

  if (!departure || !arrival || !departureDate || !departureTime || !jetType) {
    return response.status(400).json({ message: 'All booking fields are required.' });
  }
  if (!Number.isInteger(passengerCount) || passengerCount < 1 || passengerCount > 18) {
    return response.status(400).json({ message: 'Passengers must be a whole number between 1 and 18.' });
  }
  if (departure.trim().toLowerCase() === arrival.trim().toLowerCase()) {
    return response.status(400).json({ message: 'Departure and arrival must be different.' });
  }
  if (Number.isNaN(date.getTime()) || date < new Date()) {
    return response.status(400).json({ message: 'Departure must be a valid future date and time.' });
  }
  request.body.passengers = passengerCount;
  next();
};
