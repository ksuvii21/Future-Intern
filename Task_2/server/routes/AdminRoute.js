import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is logged in, has user data, and is an admin
  const isAdmin = token && user && user.role === 'admin';

  if (!isAdmin) {
    // Redirect them to the home page if not an admin
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;