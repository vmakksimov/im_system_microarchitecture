import * as request from './request'

const baseUrl = '/users'

export const login = (email, password) => request.post(`/login`, { email, password })
export const register = (email, password) => request.post(`/register`, { email, password})
export const logout = async (accessToken) => {
    try {
        const response = await fetch(`/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        })

        return response;

    } catch (error) {

    }
}

export const getUser = (accessToken) => request.get(`/me`, {headers: {'X-Authorization': accessToken}})
export const updateUser = (accessToken) => request.put(`/me`, {headers: {'X-Authorization': accessToken}})