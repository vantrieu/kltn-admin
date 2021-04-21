export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOG_OUT = 'LOG_OUT';

export const LOAD_CURRENT_USER_REQUEST = 'LOAD_CURRENT_USER_REQUEST';
export const LOAD_CURRENT_USER_SUCCESS = 'LOAD_CURRENT_USER_SUCCESS';
export const LOAD_CURRENT_USER_FAILURE = 'LOAD_CURRENT_USER_FAILURE';

export interface AuthenticatedUser {
    _id: string;
    firstname: string;
    lastname: string;
    gender: string;
    avatar: string;
    birthday: string;
}

interface LoginRequest {
    type: typeof LOGIN_REQUEST;
    payload: {
        username: string;
        password: string;
    };
}

interface LoginSuccess {
    type: typeof LOGIN_SUCCESS;
    payload: {
        accessToken: string;
        refreshToken: string;
        role: string;
        expireIn: number;
    };
}

interface LoginFailure {
    type: typeof LOGIN_FAILURE;
    payload: {
        error: string;
    };
}

interface LoadCurrentUserRequest {
    type: typeof LOAD_CURRENT_USER_REQUEST;
}

interface LoadCurrentUserSuccess {
    type: typeof LOAD_CURRENT_USER_SUCCESS;
    payload: {
        user: AuthenticatedUser;
    }
}

interface LoadCurrentUserFailure {
    type: typeof LOAD_CURRENT_USER_FAILURE;
    payload: {
        error: string;
    }
}

interface Logout {
    type: typeof LOG_OUT;
}

export interface AccountState {
    user: AuthenticatedUser | null;
    loading: boolean;
    error: string;
    accessToken: string | null;
    refreshToken: string | null;
    role: string | null;
    expireIn: number | 0;
}

export type AccountActionTypes = 
    | LoginRequest
    | LoginSuccess
    | LoginFailure
    | Logout
    | LoadCurrentUserRequest
    | LoadCurrentUserSuccess
    | LoadCurrentUserFailure;