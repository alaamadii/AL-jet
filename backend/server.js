const path = require('node:path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');

const app = express();
const port = Number(process.env.PORT) || 5000;
const frontendDirectory = path.resolve(__dirname, '..');

app.disable('x-powered-by');
app.use(cors({ origin: process.env.CLIENT_ORIGIN || true }));
app.use(express.json({ limit: '20kb' }));

app.get('/api/v1/health', (_request, response) => {
  response.json({ status: 'ok' });
});
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/bookings', bookingRoutes);

app.use(express.static(frontendDirectory, { extensions: ['html'] }));
app.get('/', (_request, response) => response.sendFile(path.join(frontendDirectory, 'main.html')));

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: 'An unexpected server error occurred.' });
});

async function startServer() {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be set to a value of at least 32 characters.');
  }
  await connectDatabase();
  app.listen(port, () => console.log(`AL Jet is running at http://localhost:${port}`));
}

startServer().catch((error) => {
  console.error(`Unable to start server: ${error.message}`);
  process.exitCode = 1;
});
