import { api } from '../helpers/index';

const login = async (username: string, password: string) => {
    return await api.post('/accounts/login', { username, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const logout = () => {
    sessionStorage.removeItem('user');
}

export const userService = {
    login,
    logout
}