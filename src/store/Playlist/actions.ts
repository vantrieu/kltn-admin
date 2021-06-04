import { playlistsServices } from './../../services/playlist.services';
import { 
    PlaylistsActionTypes,
    LOAD_PLAYLIST_SUCCESS,
    LOAD_PLAYLIST_REQUEST,
    LOAD_PLAYLIST_FAILURE,
    DELETE_PLAYLIST
} from './types';
import { Dispatch } from "redux";

export const GetListPlaylist = (limit: number, page: number, keyWord: String) => {
    return async (dispatch: Dispatch<PlaylistsActionTypes>) => {
        dispatch({
            type: LOAD_PLAYLIST_REQUEST
        });

        try {
            const response = await playlistsServices.GetListPlaylist(limit, page, keyWord);
            dispatch({
                type: LOAD_PLAYLIST_SUCCESS,
                payload: {
                    playlists: response.data.items,
                    metaData: response.data.meta
                }
            });
        } catch (error) {
            dispatch({
                type: LOAD_PLAYLIST_FAILURE,
                payload: {
                    error: error.toString()
                },
            });
        }
    }
}

export const DeletePlaylist = (playlist_id: string) => {
    return async (dispatch: Dispatch<PlaylistsActionTypes>) => {
        const response = await playlistsServices.DeletePlaylistById(playlist_id);
        if (response.data.status === 200) {
            dispatch({
                type: DELETE_PLAYLIST,
                payload: {
                    playlist_id: playlist_id 
                }
            });
        }

    }
}