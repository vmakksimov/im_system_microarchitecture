import axios from 'axios';

export const request = async (baseURL, url, method, data) => {
    try {
        const user = localStorage.getItem('authToken');
        const auth = JSON.parse(user || '{}');

        const headers = {};

        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken;
        }

        const options = {
            baseURL,
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

export const get = (baseURL, url, data) => request(baseURL, url, 'GET', data);
export const post = (baseURL, url, data) => request(baseURL, url, 'POST', data);
export const put = (baseURL, url, data) => request(baseURL, url, 'PUT', data);
export const del = (baseURL, url, data) => request(baseURL, url, 'DELETE', data);
