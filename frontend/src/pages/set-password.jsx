import React, { useState } from 'react';
import axios from 'axios';
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import ParticleBackground from "../widgets/particals/ParticleBackground";
import './set-password.css';

export const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const getToken = localStorage.getItem('access');
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
        <section className="set-password-section">
            <div className="particles-container">
                <ParticleBackground />
            </div>
            <div className="form-background-password">
                <div className="text-center">
                    <Typography variant="h2" className="font-bold mb-4">Set Password</Typography>
                    <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
                        Set up a new password.
                    </Typography>
                </div>
                <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" style={{ width: "85%" }} onSubmit={handleSubmit}>
                    <label>
                        New Password:
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <Button type="submit">Set Password</Button>
                    {message && <p>{message}</p>}
                </form>
            </div>
        </section>
    );
};

export default SetPassword;
