const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token header "Authorization": "Bearer <token>"
  const authHeader = req.header('Authorization');

  const token = authHeader && authHeader.split(' ')[1];

  if (!token)
    return res
      .status(400)
      .json({ message: 'Token not existis, authorization denied' });

  try {
    // Verify token within SECRET
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Add decoded user to objet request
    req.user = decoded;

    // Go 'next' to the route
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
