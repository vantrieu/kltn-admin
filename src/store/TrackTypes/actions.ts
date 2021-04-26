import { Dispatch } from "redux";
import { trackTypesServices } from "../../services/tracktypes.services";
import {
    DELETE_TRACKTYPE,
    LOAD_TRACKTYPE_FAILURE,
    LOAD_TRACKTYPE_REQUEST,
    LOAD_TRACKTYPE_SUCCESS,
    TrackTypesActionTypes
} from "./types";

export const GetListTrackType = () => {
    return async (dispatch: Dispatch<TrackTypesActionTypes>) => {
        dispatch({
            type: LOAD_TRACKTYPE_REQUEST,
        });

        try {
            const response = await trackTypesServices.GetListTrackType();
            dispatch({
                type: LOAD_TRACKTYPE_SUCCESS,
                payload: {
                    tracktypes: response.data.items
                }
            });
        } catch (error) {
            dispatch({
                type: LOAD_TRACKTYPE_FAILURE,
                payload: {
                    error: error.toString()
                },
            });
        }
    }
}

export const DeleteTrackType = (id: string) => {
    return async (dispatch: Dispatch<TrackTypesActionTypes>) => {
        const response = await trackTypesServices.DeleteTrackType(id);
        dispatch({
            type: DELETE_TRACKTYPE,
            payload: {
                trackType: response.data.items
            }
        });
    }
}