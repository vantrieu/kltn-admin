import { playlistsServices } from './../../services/playlist.services';
import { 
    PlaylistsActionTypes,
    LOAD_PLAYLIST_SUCCESS,
    LOAD_PLAYLIST_REQUEST,
    LOAD_PLAYLIST_FAILURE
} from './types';
import { Dispatch } from "redux";

export const GetListPlaylist = (limit: number, page: number) => {
    return async (dispatch: Dispatch<PlaylistsActionTypes>) => {
        dispatch({
            type: LOAD_PLAYLIST_REQUEST
        });

        try {
            const response = await playlistsServices.GetListPlaylist(limit, page);
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