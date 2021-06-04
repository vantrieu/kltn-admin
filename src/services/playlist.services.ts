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

const GetPlaylistById = async (id: string): Promise<any> => {
    return api.get(`/playlists/detail/${id}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const AddTrackToPlaylist = async (id: string, track_id: string): Promise<any> => {
    let body = {
        playlist_id: id,
        track_ids: [track_id]
    };
    return api.post(`/playlists/add-track`, body)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const GetOptionTrack = async (id: number, page: number, keyWord: String): Promise<any> => {
    keyWord = keyWord.length === 0 ? '' : `&keyword=${keyWord}`;
    return await api.get(`/tracks/option-music/${id}?limit=25&page=${page}${keyWord}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

const RemoveTrack = async (playlist_id: string, track_id: string): Promise<any> => {
    return await api.post('/playlists/remove-track', { playlist_id, track_id })
    .then(response => {
        return response;
    })
    .catch(error => {
        return Promise.reject(error);
    })
}

const DeletePlaylistById = async (playlist_id: String): Promise<any> => {
    return await api.delete(`/playlists/delete/${playlist_id}`)
        .then(response => {
            return response;
        })
        .catch(error => {
            return Promise.reject(error);
        })
}

export const playlistsServices = {
    GetListPlaylist,
    CreatePlayList,
    GetPlaylistById,
    AddTrackToPlaylist,
    GetOptionTrack,
    RemoveTrack,
    DeletePlaylistById
}