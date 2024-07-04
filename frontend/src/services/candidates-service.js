import * as request from "./request";

const baseUrl = 'http://localhost:3030/jsonstore/books';

const secondUrl = 'http://localhost:3030/candidate';



// GET

export const getCandidates = () => request.get(secondUrl)

export const getCandidateData = (bookId) => request.get(`${secondUrl}/${bookId}`)

// POST

export const createUser = (userData) => request.post(usersUrl, userData)

export const create = (booksData) => request.post(secondUrl, booksData)