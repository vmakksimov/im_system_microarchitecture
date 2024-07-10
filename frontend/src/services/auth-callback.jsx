// AuthCallback.jsx
import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

function AuthCallback() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    console.log('tokeenn in front end', token)
    if (token) {
      localStorage.setItem('authToken', token);
    }
  }, [location.search]);

  // Redirect to home page after storing token
  return <Navigate to="/tables" />;
}

export default AuthCallback;
