import { 
    AccountState, 
    AccountActionTypes, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    LOG_OUT, 
    LOAD_CURRENT_USER_REQUEST, 
    LOAD_CURRENT_USER_SUCCESS, 
    LOAD_CURRENT_USER_FAILURE 
} from './types';

const initialState: AccountState = {
    user: null,
    loading: false,
    error: '',
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
                error: '',
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
                error: '',
                accessToken: null,
                refreshToken: null,
                role: null,
                expireIn: 0
            }
        }
        case LOAD_CURRENT_USER_REQUEST: {
            return {
                ...state,
                loading: true,
                error: ''
            }
        }
        case LOAD_CURRENT_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                error: ''
            }
        }
        case LOAD_CURRENT_USER_FAILURE: {
            return {
                ...state,
                loading: true,
                error: action.payload.error
            }
        }
        default:
            return state;
    }
}

export { accountReducer };