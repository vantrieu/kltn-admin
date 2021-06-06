export const LOAD_MODERATOR_REQUEST = 'LOAD_MODERATOR_REQUEST';
export const LOAD_MODERATOR_SUCCESS = 'LOAD_MODERATOR_SUCCESS';
export const LOAD_MODERATOR_FAILURE = 'LOAD_MODERATOR_FAILURE';
export const LOCK_MODERATOR = 'LOCK_MODERATOR';
export const UN_LOCK_MODERATOR = 'UN_LOCK_MODERATOR';

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

export interface ModeratorsState {
    moderators: Array<User>;
    metaData: MetaData | null,
    loading: boolean;
    error: string | null;
}

interface LoadModeratorRequest {
    type: typeof LOAD_MODERATOR_REQUEST
}

interface LoadModeratorSuccess {
    type: typeof LOAD_MODERATOR_SUCCESS,
    payload: {
        moderators: Array<User>,
        metaData: MetaData
    }
}

interface LoadModeratorFailure {
    type: typeof LOAD_MODERATOR_FAILURE,
    payload: {
        error: string
    }
}

interface LockModerator {
    type: typeof LOCK_MODERATOR,
    payload: {
        user_id: string
    }
}

interface UnLockModerator {
    type: typeof UN_LOCK_MODERATOR,
    payload: {
        user_id: string
    }
}

export type ModeratorsActionTypes =
    | LoadModeratorRequest
    | LoadModeratorSuccess
    | LoadModeratorFailure
    | LockModerator
    | UnLockModerator