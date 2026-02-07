import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, userRole } = useAuth();

  // 1. Check if user is logged in
  if (!currentUser) {
    // If not logged in, redirect to Login page
    return <Navigate to="/login" replace />;
  }

  // 2. Check for Role (Optional but recommended for Dashboards)
  // If allowedRoles is provided, check if the user has the correct role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If user is logged in but doesn't have permission (e.g. Tourist trying to access Admin panel)
    // Redirect them to the Home page
    return <Navigate to="/" replace />;
  }

  // 3. If all checks pass, render the protected route
  return <Outlet />;
};

export default ProtectedRoute;