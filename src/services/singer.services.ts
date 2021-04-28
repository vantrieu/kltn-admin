import { api } from '../helpers/index';

const GetListSinger = async (): Promise<any> => {
    return await api.get('/singers')
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const CreateSinger = async (body: FormData):Promise<any> => {
    return await api.post('/singers', body)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const UpdateSinger = async (id: string, body: FormData):Promise<any> => {
    return await api.put(`/singers/${id}`, body)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const singerService = {
    GetListSinger,
    CreateSinger,
    UpdateSinger
}