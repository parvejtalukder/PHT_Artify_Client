import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router'; 
import { AuthContext } from '../Context/AuthContext/AuthContext';
import Loading from '../Templates/Loading/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login" replace />; 
  }

  return children; 
};

export default PrivateRoute;