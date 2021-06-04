import { Dispatch } from "redux";
import { albumsServices } from "../../services";
import {
    AlbumsActionTypes,
    DELETE_ALBUM,
    LOAD_ALBUM_FAILURE,
    LOAD_ALBUM_REQUEST,
    LOAD_ALBUM_SUCCESS
} from "./types";

export const GetListAlbum = (limit: number, page: number, keyWord: string) => {
    return async (dispatch: Dispatch<AlbumsActionTypes>) => {
        dispatch({
            type: LOAD_ALBUM_REQUEST
        });

        try {
            const response = await albumsServices.GetListAlbum(limit, page, keyWord);
            dispatch({
                type: LOAD_ALBUM_SUCCESS,
                payload: {
                    albums: response.data.items,
                    metaData: response.data.meta
                }
            });
        } catch (error) {
            dispatch({
                type: LOAD_ALBUM_FAILURE,
                payload: {
                    error: error.toString()
                },
            });
        }
    }
}

export const DeleteAlbum = (album_id: string) => {
    return async (dispatch: Dispatch<AlbumsActionTypes>) => {
        const response = await albumsServices.DeleteAlbumById(album_id);
        if (response.data.status === 200) {
            dispatch({
                type: DELETE_ALBUM,
                payload: {
                    album_id: album_id 
                }
            });
        }

    }
}