import axios from 'axios';

export const request = async (url, method, data) => {
    try {
        const user = localStorage.getItem('authToken');
        const auth = JSON.parse(user || '{}');

        const headers = {};
        
        console.log('authhh', auth)
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

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
