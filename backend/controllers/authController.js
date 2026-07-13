const jwt = require('jsonwebtoken');
const User = require('../models/User');

function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

exports.signup = async (request, response) => {
  try {
    const { name, email, passportNumber, password } = request.body;
    if (!name || !email || !passportNumber || !password) {
      return response.status(400).json({ message: 'All fields are required.' });
    }
    if (password.length < 8) {
      return response.status(400).json({ message: 'Password must contain at least 8 characters.' });
    }
    const existingUser = await User.exists({ email: email.toLowerCase().trim() });
    if (existingUser) return response.status(409).json({ message: 'An account with this email already exists.' });

    const user = await User.create({ name, email, passportNumber, password });
    response.status(201).json({
      message: 'Account created successfully.',
      token: createToken(user.id),
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: 'Unable to create the account.' });
  }
};

exports.login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) return response.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    if (!user || !(await user.verifyPassword(password))) {
      return response.status(401).json({ message: 'Incorrect email or password.' });
    }
    response.json({
      message: 'Signed in successfully.',
      token: createToken(user.id),
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: 'Unable to sign in.' });
  }
};
