import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
console.log("ProtectedRoute user:", user);
  console.log("ProtectedRoute isAuthenticated:", isAuthenticated);
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" />;
  // }

  // if (user?.userType !== 'business') {
  //   return <Navigate to="/" />;
  // }

  return <>{children}</>;
};

export default ProtectedRoute;