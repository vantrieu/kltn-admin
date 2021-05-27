import { api } from '../helpers/index';

const CreateTrack = async (body: FormData): Promise<any> => {
    return await api.post('/tracks/create-track', body)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const GetListTrack = async (limit: number, page: number, keyWord: string): Promise<any> => {
    keyWord = (keyWord === '' || keyWord.length === 0) ? `` :  `&keyword=${keyWord}`;
    return await api.get(`/tracks/list-music?limit=${limit}&page=${page}${keyWord}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const UpdateTrack = async (id: string, body: FormData): Promise<any> => {
    return await api.post(`/tracks/update-track/${id}`, body)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const DeleteTrack = async (id: string): Promise<any> => {
    return await api.delete(`/tracks/delete/${id}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const trackService = {
    CreateTrack,
    GetListTrack,
    UpdateTrack,
    DeleteTrack
}