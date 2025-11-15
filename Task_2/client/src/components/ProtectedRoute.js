import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ user, allowedRoles, children }) => {
  const location = useLocation();

  if (!user) {
    // If user is not logged in, redirect to login page
    // and save the location they were trying to go to.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // If user's role is not in the allowedRoles, redirect to home page.
    // You could also redirect to a dedicated "Unauthorized" page.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;