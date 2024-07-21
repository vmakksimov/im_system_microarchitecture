// AuthCallback.jsx
import React, { useEffect, useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AuthCallback() {
  const location = useLocation();

  const { userLogin } = useContext(AuthContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      userLogin({"authToken": token});
      
    }
  }, [location.search]);

  // Redirect to home page after storing token
  return <Navigate to="/tables" />;
}

export default AuthCallback;
