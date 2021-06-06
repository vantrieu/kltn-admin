import { Dispatch } from 'redux';
import { albumsServices } from '../../services';
import { 
    LOAD_MODERATOR_FAILURE,
    LOAD_MODERATOR_REQUEST, 
    LOAD_MODERATOR_SUCCESS, 
    LOCK_MODERATOR, 
    ModeratorsActionTypes, 
    UN_LOCK_MODERATOR
} from "./types";

export const GetListModerator = (limit: number, page: number, keyWord: string) => {
    return async (dispatch: Dispatch<ModeratorsActionTypes>) => {
        dispatch({
            type: LOAD_MODERATOR_REQUEST
        });

        try {
            const response = await albumsServices.GetListAlbum(limit, page, keyWord);
            dispatch({
                type: LOAD_MODERATOR_SUCCESS,
                payload: {
                    moderators: response.data.items,
                    metaData: response.data.meta
                }
            });
        } catch (error) {
            dispatch({
                type: LOAD_MODERATOR_FAILURE,
                payload: {
                    error: error.toString()
                },
            });
        }
    }
}

export const LockModerator = (_id: string) => {
    return async (dispatch: Dispatch<ModeratorsActionTypes>) => {
        const response = await albumsServices.DeleteAlbumById(_id);
        if (response.data.status === 200) {
            dispatch({
                type: LOCK_MODERATOR,
                payload: {
                    user_id: _id 
                }
            });
        }

    }
}

export const UnLockModerator = (_id: string) => {
    return async (dispatch: Dispatch<ModeratorsActionTypes>) => {
        const response = await albumsServices.DeleteAlbumById(_id);
        if (response.data.status === 200) {
            dispatch({
                type: UN_LOCK_MODERATOR,
                payload: {
                    user_id: _id 
                }
            });
        }

    }
}