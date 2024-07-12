// Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Notify the backend to log out the user
    axios.get('http://localhost:8000/auth/api/logout/')
      .then(response => {
        // Clear the token from local storage
        localStorage.removeItem('authToken');
        // Redirect to the home page or sign-in page
        navigate('/home');
      })
      .catch(error => {
        console.error('There was an error logging out!', error);
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
