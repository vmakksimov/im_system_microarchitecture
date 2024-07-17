import axios from 'axios';

export const request = async (url, method, data) => {
    try {
        const user = localStorage.getItem('authToken');
        const auth = JSON.parse(user || '{}');

        const headers = {};

        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken;
        }

        const options = {
            baseURL: 'http://localhost:8000',
            url,
            method,
            headers,
        };

        if (method !== 'GET') {
            options.headers['Content-Type'] = 'application/json';
            options.data = JSON.stringify(data);
        }

        const response = await axios(options);

        return response.data;
    } catch (error) {
        console.error('Error making request:', error);
        throw error;
    }
};

export const get = (url, data) => request(url, 'GET', data);
export const post = (url, data) => request(url, 'POST', data);
export const put = (url, data) => request(url, 'PUT', data);
export const del = (url, data) => request(url, 'DELETE', data);
