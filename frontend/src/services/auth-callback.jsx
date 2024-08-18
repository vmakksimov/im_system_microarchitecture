// AuthCallback.jsx
import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import * as request from './request'

const baseURL = 'http://localhost:8000/auth';

function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext);

  useEffect(() => {
    const exchangeToken = async () => {
      const csrfToken = getCookie('csrftoken');

      try {
        const response = await fetch(`${baseURL}/api/exchange-token/`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'X-CSRFToken': csrfToken,
            'Content-Type': 'application/json',
          },
        });

        console.log("response in authcallback",response)
        
        if (response.ok) {
          const data = await response.json();
          console.log("data in authcallback", data)
          localStorage.setItem('access', data.token);
          userLogin({"access": data.token});
          navigate('/tables');
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error exchanging token:', error);
        navigate('/login');
      }
    };

    exchangeToken();
  }, []);

  return null; // or a loading spinner
}

// Helper function to get CSRF token from cookie
function getCookie(name) {
  console.log('document.coookie', document.cookie)
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(name))
    ?.split('=')[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
}

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const token = searchParams.get('token');
  //   if (token) {
  //     localStorage.setItem('access', token);
  //     userLogin({"access": token});
      
  //   }
  // }, [location.search]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('/api/user', {
  //         credentials: 'include',  // This is important to include cookies
  //       });
  //       if (response.ok) {
  //         const userData = await response.json();
  //         console.log('User data in auth callback:', userData);
  //         // userLogin(userData);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  
  //   fetchUserData();
  // }, []);

  // Redirect to home page after storing token
  //return <Navigate to="/tables" />;


export default AuthCallback;
