// Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import * as AuthService from '../services/auth-service'

const Logout = () => {
  const navigate = useNavigate();

  const { token, userLogout } = useContext(AuthContext);

  useEffect(() => {
    AuthService.logout(token)
      .then(response => {
        localStorage.removeItem('access');
        userLogout();
        navigate('/home');
      })
      .catch(error => {
        console.error('There was an error logging out!', error);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
