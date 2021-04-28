import { Dispatch } from "redux";
import { singerService } from "../../services";
import {
    LOAD_SINGER_FAILURE,
    LOAD_SINGER_REQUEST,
    LOAD_SINGER_SUCCESS,
    SingersActionTypes
} from "./types";

export const GetListSinger = () => {
    return async (dispatch: Dispatch<SingersActionTypes>) => {
        dispatch({
            type: LOAD_SINGER_REQUEST,
            payload: {
                loading: true
            }
        });

        try {
            const response = await singerService.GetListSinger();
            dispatch({
                type: LOAD_SINGER_SUCCESS,
                payload: {
                    loading: false,
                    singers: response.data.items
                }
            });
        } catch (error) {
            dispatch({
                type: LOAD_SINGER_FAILURE,
                payload: {
                    loading: false,
                    error: error.toString()
                },
            });
        }
    }
}