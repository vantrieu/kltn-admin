import { api } from '../helpers/index';
// import { Playlist } from '../store/Playlist/types';



const GetListPlaylist = async (limit: number, page: number): Promise<any> => {
    return await api.get(`/playlists?limit=${limit}&page=${page}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const playlistsServices = {
    GetListPlaylist
}