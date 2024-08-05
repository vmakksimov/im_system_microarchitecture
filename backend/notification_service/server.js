const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
const http = require('http');
require('dotenv').config();
const port = process.env.PORT || 9000;
const baseURL = process.env.FLASK_URL


const allowedOrigins = [
    'http://localhost:5173', // React app
    'http://localhost:5000'  // Flask server
];

app.use(cors({
    origin: function(origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers if needed
}));

app.use(express.json());

app.post("/notification_service/feedback", async (req, res) => {
    const { candidateId } = req.body; 
    const token = req.headers.authorization; 
    console.log('candidateID', candidateId)
    console.log('token', token)
    

    try {
        
        const response = await axios.get(`/management_service/feedback/${candidateId}`, {
            headers: {
                'Authorization': token,
            }
        });
        console.log('baseURL in nodejs', baseURL)
        const feedbackStatus = response.data;

        
        res.send({
            status: 200,
            feedbackStatus: feedbackStatus
        });
    } catch (error) {
        console.error("Error fetching feedback status:", error);
        res.status(500).send({
            status: 500,
            message: "Failed to fetch feedback status"
        });
    }
});


const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})