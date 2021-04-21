import { api } from '../helpers/index';

const login = async (username: string, password: string): Promise<any> => {
    return await api.post('/accounts/login', { username, password })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const GetMyProfile = async (): Promise<any> => {
    return await api.get('/users/my-profile')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const userService = {
    login,
    GetMyProfile
}