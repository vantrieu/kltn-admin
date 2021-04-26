import { api } from '../helpers/index';

const login = async (username: string, password: string): Promise<any> => {
    return await api.post('/accounts/login', { username, password })
        .then(response => {
            return response;
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

const FotgotPassword = async (email: string): Promise<any> => {
    return await api.post('/accounts/forgot-password', { email })
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const ResetPassWord = async (password: string, token: string) => {
    api.defaults.headers.common['x-access-token'] = `${token}`;
    return await api.post('/accounts/change-password', { password })
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const userService = {
    login,
    GetMyProfile,
    FotgotPassword,
    ResetPassWord
}