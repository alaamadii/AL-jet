const jwt = require('jsonwebtoken');

exports.protect = (request, response, next) => {
  const authorization = request.get('authorization');
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return response.status(401).json({ message: 'Please sign in to continue.' });
  }

  try {
    request.user = jwt.verify(authorization.slice(7), process.env.JWT_SECRET);
    next();
  } catch (_error) {
    response.status(401).json({ message: 'Your session is invalid or has expired. Please sign in again.' });
  }
};
