import { api } from '../helpers/index';

const CreateAlbum = async (body: FormData): Promise<any> => {
    return await api.post('/albums', body)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const GetListAlbum = async (limit: number, page: number, keyword: string): Promise<any> => {
    var queryUrl = `?page=${page}&limit=${limit}`;
    if (keyword.length !== 0){
        queryUrl += `&keyword=${keyword}`; 
    }
    return await api.get(`/albums${queryUrl}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

export const albumsServices = {
    CreateAlbum,
    GetListAlbum
}