import * as request from './request'

// const baseUrl = 'http://localhost:8000/'
const baseUrl = '/api_auth/';

export const login = (email, password) => request.post(baseUrl, `auth/api/token/`, { email, password })
export const register = (email, password, password2) => request.post(baseUrl, `auth/register/`, { email, password, password2 })
export const logout = async (accessToken) => {
    try {
        const response = await fetch(baseUrl, `logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        })

        return response;

    } catch (error) {

    }
}

export const getUser = (accessToken) => request.get(baseUrl, `/me`, {headers: {'X-Authorization': accessToken}})
export const updateUser = (accessToken) => request.put(baseUrl, `/me`, {headers: {'X-Authorization': accessToken}})