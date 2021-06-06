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

const GetListUser = async (page: number, keyWord: String): Promise<any> => {
    keyWord = keyWord.length === 0 ? '' : `&keyword=${keyWord}`;
    return await api.get(`/accounts/list-account?limit=25&page=${page}${keyWord}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const GetListModerator = async (page: number, keyWord: String): Promise<any> => {
    keyWord = keyWord.length === 0 ? '' : `&keyword=${keyWord}`;
    return await api.get(`/accounts/list-moderator?limit=25&page=${page}${keyWord}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const LockAccount = async (_id: string): Promise<any> => {
    return await api.post('/accounts/lock-account', { id: _id })
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const UnLockAccount = async (_id: string): Promise<any> => {
    return await api.post('/accounts/un-lock-account', { id: _id })
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const CreateModerator = async (body: any): Promise<any> => {
    return await api.post('/accounts/register-moderator', body)
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
    ResetPassWord,
    GetListUser,
    GetListModerator,
    LockAccount,
    UnLockAccount,
    CreateModerator
}