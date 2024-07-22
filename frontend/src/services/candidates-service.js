import * as request from "./request";

const baseURL = 'http://localhost:5000/candidates';




// POST

export const createCandidate = (userData) => request.post(baseURL, '/', userData)
