import { api } from '../helpers/index';
// import { Playlist } from '../store/Playlist/types';



const GetListPlaylist = async (limit: number, page: number, keyWord: String): Promise<any> => {
    return await api.get(`/playlists?limit=${limit}&page=${page}&keyword=${keyWord}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const CreatePlayList = async (body: FormData): Promise<any> => {
    return await api.post('/playlists/create-playlist', body)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const playlistsServices = {
    GetListPlaylist,
    CreatePlayList
}