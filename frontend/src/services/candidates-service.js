import * as request from "./request";

const baseURL = 'http://localhost:5000';
const feedbackURL = 'http://localhost:9000';
// const baseURL = '/management_service'; 
// const feedbackURL = '/notification_service';


// GET

export const getCandidates = (status = null) => {
    const url = status ? `/candidates?status=${encodeURIComponent(status)}` : '/candidates';
    return request.get(baseURL, url);
}

// POST

export const createCandidate = (userData) => request.post(baseURL, '/candidates', userData)
export const editCandidate = (candidateId, userData) => request.put(baseURL, `/candidate/${candidateId}`, userData)


// DELETE
export const removeCandidate = (candidateId) => request.del(baseURL, `/candidate/${candidateId}`)

// FEEDACK NODEJS

export const sendFeedback = (candidateId) => request.post(feedbackURL, '/feedback', { candidateId });