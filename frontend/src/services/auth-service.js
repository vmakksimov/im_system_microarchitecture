import * as request from './request'

const baseUrl = '/users'

export const login = (email, password) => request.post(`/login`, { email, password })
export const register = (email, password, username, image, first_name, last_name, usertype) => request.post(`/register`, { email, password, username, image, first_name, last_name, usertype })
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