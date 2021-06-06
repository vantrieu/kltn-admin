export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
export const LOCK_USER = 'LOCK_USER';
export const UN_LOCK_USER = 'UN_LOCK_USER';

// export const LOAD_MODERATOR_REQUEST = 'LOAD_MODERATOR_REQUEST';
// export const LOAD_MODERATOR_SUCCESS = 'LOAD_MODERATOR_SUCCESS';
// export const LOAD_MODERATOR_FAILURE = 'LOAD_MODERATOR_FAILURE';
// export const LOCK_MODERATOR = 'LOCK_MODERATOR';
// export const UN_LOCK_MODERATOR = 'UN_LOCK_MODERATOR';

export interface User {
    _id: string,
    username: string,
    email: string,
    phonenumber: string,
    createdAt: string,
    isLock: number
}

export interface MetaData {
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}

export interface UsersState {
    users: Array<User>;
    metaData: MetaData | null,
    loading: boolean;
    error: string | null;
}

interface LoadUserRequest {
    type: typeof LOAD_USER_REQUEST
}

interface LoadUserSuccess {
    type: typeof LOAD_USER_SUCCESS,
    payload: {
        users: Array<User>,
        metaData: MetaData
    }
}

interface LoadUserFailure {
    type: typeof LOAD_USER_FAILURE,
    payload: {
        error: string
    }
}

interface LockUser {
    type: typeof LOCK_USER,
    payload: {
        user_id: string
    }
}

interface UnLockUser {
    type: typeof UN_LOCK_USER,
    payload: {
        user_id: string
    }
}

export type UsersActionTypes =
    | LoadUserRequest
    | LoadUserSuccess
    | LoadUserFailure
    | LockUser
    | UnLockUser