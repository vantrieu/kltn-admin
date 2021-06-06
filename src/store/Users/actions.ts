import { Dispatch } from "redux";
import { userService } from "../../services";
import { 
    LOAD_USER_FAILURE, 
    LOAD_USER_REQUEST, 
    LOAD_USER_SUCCESS, 
    LOCK_USER, 
    UN_LOCK_USER, 
    UsersActionTypes 
} from "./types";

export const GetListUser = (page: number, keyWord: string) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        dispatch({
            type: LOAD_USER_REQUEST
        });

        try {
            const response = await userService.GetListUser(page, keyWord)
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: {
                    users: response.data.items,
                    metaData: response.data.meta
                }
            });
        } catch (error) {
            dispatch({
                type: LOAD_USER_FAILURE,
                payload: {
                    error: error.toString()
                },
            });
        }
    }
}

export const LockUser = (_id: string) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        const response = await userService.LockAccount(_id);
        if (response.data.status === 200) {
            dispatch({
                type: LOCK_USER,
                payload: {
                    user_id: _id 
                }
            });
        }

    }
}

export const UnLockUser = (_id: string) => {
    return async (dispatch: Dispatch<UsersActionTypes>) => {
        const response = await userService.UnLockAccount(_id);
        if (response.data.status === 200) {
            dispatch({
                type: UN_LOCK_USER,
                payload: {
                    user_id: _id 
                }
            });
        }

    }
}