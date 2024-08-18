import axios from 'axios';

export const request = async (baseURL, url, method, data) => {
    try {
        const user = localStorage.getItem('access');
        const auth = JSON.parse(user || '{}');

        const headers = {};

        if (auth.access) {
            headers['Authorization'] = `Bearer ${auth.access}`;
        }

        // const csrfToken = document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
        // if (csrfToken) {
        //     headers['X-CSRFToken'] = csrfToken;
        // }


        const options = {
            baseURL,
            url: url.startsWith('/') ? url : `/${url}`,
            method,
            headers,
            withCredentials: true, 
        };

        if (method !== 'GET') {
            const csrfToken = getCookie('csrftoken');
            if (csrfToken) {
                headers['X-CSRFToken'] = csrfToken;
            }
            options.headers['Content-Type'] = 'application/json';
            options.data = JSON.stringify(data);
        }

        const response = await axios(options);

        return response.data;
    } catch (error) {
        console.log("error in catch request.js", error)
        // if (error.response && error.response.status === 403) {
        //     console.log('Access token expired, attempting to refresh token...');
        //     try {
        //         const refreshedData = await refreshAccessToken();
        //         if (refreshedData.access) {
        //             localStorage.setItem('access', JSON.stringify(refreshedData));
        //             console.log('Token refreshed successfully. Retrying original request...');
        //             return await request(baseURL, url, method, data); // Retry the original request
        //         }
        //     } catch (refreshError) {
        //         console.error('Token refresh failed:', refreshError);
        //         //TODO Pop up to sign in again
        //         localStorage.setItem('access', JSON.stringify({ access: "no token" }));
        //         throw refreshError;
        //     }
        // } else {
        //     console.error('Error making request:', error);
        //     throw error;
        // }
    }
};

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const refreshAccessToken = async () => {
    let auth = JSON.parse(localStorage.getItem('access') || '{}');

    if (!auth.refresh) {
        throw new Error('No refresh token available');
    }

    try {
        const response = await axios.post('http://localhost:8000/auth/api/token/refresh/', {
            refresh: auth.refresh,
        });
        console.log('Refresh token response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error refreshing token:', error);
        throw error;
    }
};


export const get = (baseURL, url, data) => request(baseURL, url, 'GET', data);
export const post = (baseURL, url, data) => request(baseURL, url, 'POST', data);
export const put = (baseURL, url, data) => request(baseURL, url, 'PUT', data);
export const del = (baseURL, url, data) => request(baseURL, url, 'DELETE', data);
