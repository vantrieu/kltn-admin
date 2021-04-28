export const LOAD_SINGER_REQUEST = 'LOAD_SINGER_REQUEST';
export const LOAD_SINGER_SUCCESS = 'LOAD_SINGER_SUCCESS';
export const LOAD_SINGER_FAILURE = 'LOAD_SINGER_FAILURE';

export interface Singer {
    _id: string,
    name: string,
    description: string,
    avatar: string,
    createdAt: string,
    updatedAt: string
}

export interface SingersState {
    singers: Array<Singer>,
    loading: boolean,
    error: string | null
}

interface LoadSingerRequest {
    type: typeof LOAD_SINGER_REQUEST,
    payload:{
        loading: boolean
    }
}

interface LoadSingerSuccess {
    type: typeof LOAD_SINGER_SUCCESS,
    payload:{
        singers: Array<Singer>,
        loading: boolean
    }
}

interface LoadSingerFailure {
    type: typeof LOAD_SINGER_FAILURE,
    payload:{
        loading: boolean,
        error: string
    }
}

export type SingersActionTypes = 
    | LoadSingerRequest
    | LoadSingerSuccess
    | LoadSingerFailure;