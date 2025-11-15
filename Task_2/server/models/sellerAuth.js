const sellerAuth = (req, res, next) => {
  // This middleware assumes the 'auth' middleware has already run
  // and attached the user object to the request.
  if (req.user && (req.user.role === 'admin' || req.user.role === 'seller')) {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin or seller role required.' });
  }
};

module.exports = sellerAuth;