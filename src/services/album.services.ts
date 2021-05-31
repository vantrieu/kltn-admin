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

const DetailAlbum =async (id: number):Promise<any> => {
    return await api.get(`/albums/detail/${id}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        });
}

const GetOptionTrack = async (id: number, page: number, keyWord: String): Promise<any> => {
    keyWord = keyWord.length === 0 ? '' : `&keyword=${keyWord}`;
    return await api.get(`/tracks/option/${id}?limit=25&page=${page}${keyWord}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const albumsServices = {
    CreateAlbum,
    GetListAlbum,
    DetailAlbum,
    GetOptionTrack
}