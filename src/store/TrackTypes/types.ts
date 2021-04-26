export const LOAD_TRACKTYPE_REQUEST = 'LOAD_TRACKTYPE_REQUEST';
export const LOAD_TRACKTYPE_SUCCESS = 'LOAD_TRACKTYPE_SUCCESS';
export const LOAD_TRACKTYPE_FAILURE = 'LOAD_TRACKTYPE_FAILURE';

export const DELETE_TRACKTYPE = 'DELETE_TRACKTYPE';

export interface TrackTypes {
    _id: string;
    typename: string;
    updatedAt: string;
    createdAt: string;
}

export interface TrackTypesState {
    tracktypes: Array<TrackTypes>;
    loading: boolean;
    error: string | null;
}

interface LoadTracktypeRequest {
    type: typeof LOAD_TRACKTYPE_REQUEST;
}

interface LoadTracktypeSuccess {
    type: typeof LOAD_TRACKTYPE_SUCCESS;
    payload: {
        tracktypes: Array<TrackTypes>;
    }
}

interface LoadTracktypeFailure {
    type: typeof LOAD_TRACKTYPE_FAILURE;
    payload: {
        error: string;
    }
}

interface DeleteTrackType {
    type: typeof DELETE_TRACKTYPE;
    payload: {
        trackType: TrackTypes
    }
}

export type TrackTypesActionTypes = 
    | LoadTracktypeRequest
    | LoadTracktypeSuccess
    | LoadTracktypeFailure
    | DeleteTrackType