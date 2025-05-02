import axios from 'axios';

const API_BASE_URL = 'https://spendora.test/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        config.headers['X-Requested-With'] = 'XMLHttpRequest';

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;