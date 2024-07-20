import React, { useState } from 'react';
import axios from 'axios';

export const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const getToken = localStorage.getItem('authToken');
        // const auth = JSON.parse(user || '{}');
        console.log("user", getToken)
        // const accessToken = JSON.stringify(getToken);
        // console.log("accesss", accessToken)
        try {
            
           
            const response = await axios.post('http://localhost:8000/auth/set-password/', { password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken}`
                    
                }
            });
            console.log(response.data);
            setMessage(response.data.detail);
        } catch (error) {
            console.error('Error setting password:', error);
            if (error.response && error.response.data && error.response.data.detail) {
                setMessage(error.response.data.detail);
            } else {
                setMessage('Error setting password');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                New Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit">Set Password</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default SetPassword;
