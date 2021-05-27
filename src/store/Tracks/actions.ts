import { Dispatch } from "redux";
import { trackService } from "../../services";
import {
    DELETE_TRACK,
    LOAD_TRACK_FAILURE,
    LOAD_TRACK_REQUEST,
    LOAD_TRACK_SUCCESS,
    TracksActionTypes
} from "./types";

export const GetListTrack = (limit: number, page: number, keyWord: string) => {
    return async (dispatch: Dispatch<TracksActionTypes>) => {
        dispatch({
            type: LOAD_TRACK_REQUEST
        });

        try {
            const response = await trackService.GetListTrack(limit, page, keyWord);
            dispatch({
                type: LOAD_TRACK_SUCCESS,
                payload: {
                    tracks: response.data.items,
                    metaData: response.data.meta
                }
            });
        } catch (error) {
            dispatch({
                type: LOAD_TRACK_FAILURE,
                payload: {
                    error: error.toString()
                },
            });
        }
    }
}

export const DeleteTrack = (id: string) => {
    return async (dispatch: Dispatch<TracksActionTypes>) => {
        const response = await trackService.DeleteTrack(id);
        if (response.status === 200) {
            dispatch({
                type: DELETE_TRACK,
                payload: {
                    id: id
                }
            });
        }
    }
}
