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

export const albumsServices = {
    CreateAlbum
}