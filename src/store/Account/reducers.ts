import { AccountState, AccountActionTypes, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOG_OUT } from './types';

const initialState: AccountState = {
    user: null,
    loading: false,
    error: null,
    accessToken: null,
    refreshToken: null,
    role: null,
    expireIn: 0
}

const accountReducer = (
    state: AccountState = initialState,
    action: AccountActionTypes
): AccountState => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            return {
                ...state,
                loading: true
            };
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                error: null,
                loading: false,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                expireIn: action.payload.expireIn,
                role: action.payload.role
            };
        }
        case LOGIN_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                user: null,
                loading: false,
                error: null,
                accessToken: null,
                refreshToken: null,
                role: null,
                expireIn: 0
            }
        }
        default:
            return state;
    }
}

export { accountReducer };