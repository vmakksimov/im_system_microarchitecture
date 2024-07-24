import * as request from "./request";

const baseURL = 'http://localhost:5000';


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