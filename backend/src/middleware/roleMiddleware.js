const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Verify if user exists
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized. User not found' });
    }

    //verify if user role is included in the allowed roles
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. ${req.user.role} role is not allowed to access this resource.`,
      });
    }

    // If user role is allowed, proceed to the next middleware or route handler
    next();
  };
};

module.exports = roleMiddleware;
