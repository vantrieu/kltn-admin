import { userService } from './../../services/user.service';
import { AccountActionTypes, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT } from './types';
import { Dispatch } from "react";
import { history } from '../../helpers';

export const login = (username: string, password: string, from: string) => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
        dispatch({
            type: LOGIN_REQUEST,
            payload: {
                username: username,
                password: password
            }
        });

        try {
            const response = await userService.login(username, password);
            if(response.status === 200 && (response.items.role === 'Moderator' || response.items.role === 'Administrator')){
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response.items,
                });
                history.push(from);
            } else {
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: { 
                        error:  response.message
                    },
                });
            }
        } catch (error) {
            dispatch({
                type: LOGIN_FAILURE,
                payload: { error: error.toString() },
            });
        }
    }
}

export const logout = (): AccountActionTypes => {
    return {type: LOG_OUT}
}